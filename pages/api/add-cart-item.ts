// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/increase-cart`;
    const headers = {
      'origin': 'localhost',
      cookie: req.headers.cookie
    }
    // axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
    // .then(res => console.log('scn', res))
    // .catch(err => console.log('sncterr', err))

    const respWithAxios = await axios
      .post(url, req.body, {
        headers
      })
      .then(res => res.data)

    res.status(200).json({ data: respWithAxios });

  }
  catch (error) {
    res.status(200).json({ error: `There was an error. ${error}`})
  }
}
