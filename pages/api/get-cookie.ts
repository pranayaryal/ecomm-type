// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {

    const session = await getIronSession(req, res, { password: process.env.NEXT_PUBLIC_COOKE_PW,
      ttl: 120,
      cookieOptions: {
        httpOnly: true,
        secure: false, // set this to false in local (non-HTTPS) development
        sameSite: "lax",// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
        maxAge: 120, // Expire cookie before the session expires.
        path: "/",
      },
      cookieName: 'cart'})
      const { cart } = session
      res.status(200).json({ cart })

  }
  catch (error) {
    res.status(200).json({ error: `There was an error. ${error}`})
  }
}