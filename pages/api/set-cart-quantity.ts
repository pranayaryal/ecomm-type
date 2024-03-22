// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/set-cart-quantity`;
    //await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
    const headers = {
      'origin': 'localhost',
      cookie: req.headers.cookie
    }

    const respWithAxios = await axios
      .post(url, req.body, {
        headers
      })
      .then(res => res.data)

    res.status(200).json(respWithAxios);

  }
  catch (error) {
    console.log(error)
    res.status(200).json({ error: `There was an error. ${error}`})
  }
}
