import React, { useState, useEffect } from 'react'
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import ShippingAddressForm from './ShippingAddressForm'

export default function StripeCheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(true)
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
          setIsFormVisible(false)
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
        return_url: 'http://localhost:3000/checkout'
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
    <div className='mt-4'>
      <AddressElement options={{mode: 'billing', allowedCountries: ['US']}}/>
      <p className='text-sm  font-semibold'>Make your payment</p>
      {message && <div id='payment-message'>{message}</div>}
      {isFormVisible && (<form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element"
          className='mt-4' options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          className='bg-black px-3 py-2 text-md w-2/5 text-white mt-8'>
          <span id="button-text">{isLoading ? <div id="spinner" className='spinner'></div> : 'Pay now'}</span>
        </button>
        {message && <div id='payment-message'>{message}</div>}


      </form>)}
    </div>
  )
}
