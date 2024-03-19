// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address`;
    const params = req.query
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address`;
    const finalUrl = `${baseUrl}?${queryString}`
    //await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
    const headers = {
      'origin': 'localhost',
      'Content-Type': 'application/json',
      cookie: req.headers.cookie
    }


    const respWithAxios = await axios
      .get(finalUrl, {
        headers
      })
      .then(res => res.data)

    res.status(200).json(respWithAxios);

  }
  catch (error) {
    res.status(200).json({ error: `There was an error. ${error}`})
  }
}
