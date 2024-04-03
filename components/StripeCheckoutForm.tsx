import React, { useState, useEffect } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

export default function StripeCheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    type PaymentIntentResult = {
      paymentIntent: {
        status: string;
      };
    };

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break;
        case "processing":
          setMessage("Your payment is processing.")
          break;
        case "requires_payment_method":
          setMessage("Payment method not successful. Please try again.")
          break;
        default:
          setMessage("Something went wrong.")
          break;



      }
    })

  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000'
      }
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred')
    }


  }

  const paymentElementOptions = {
    layout: 'tabs'
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <div id="spinner" className='spinner'></div> : 'Pay now'}</span>
      </button>
      {message && <div id='payment-message'>{message}</div>}


    </form>
  )
}
