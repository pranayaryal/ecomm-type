// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {

    const session = await getIronSession(req, res,
      {
        password: process.env.NEXT_PUBLIC_COOKE_PW,
        ttl: 120,
        cookieOptions: {
          httpOnly: true,
          secure: false, // set this to false in local (non-HTTPS) development
          sameSite: "lax",
          maxAge: 120, 
          path: "/",
        },
        cookieName: 'cart'
      })
    session.cart = req.body.cartItems
    await session.save()
    res.status(200).json({ message: 'Cookie was saved' })

  }
  catch (error) {
    res.status(200).json({ error: `There was an error. ${error}` })
  }
}