import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const calculateOrderAmount = () => {
  return 1400;

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {

    const { items } = req.body

    const paymentIntent = await stripe.paymentIntent.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
}


