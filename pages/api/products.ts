// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'
import cookie from 'cookie'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // const csrf = () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
    // await csrf()

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;
    const headers = {
      // 'origin': 'localhost',
      // cookie: req.cookies.laravel_session
    }
    const respWithAxios = await axios
      .get(url, {
        headers
      })
      .then(res => res.data)
    
    
    res.status(200).json(respWithAxios);

  }
  catch (error) {
    res.status(200).json({ error: `There was an error. ${error}`})
  }
}
