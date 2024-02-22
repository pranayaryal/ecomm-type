// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    //const { query: { name, keyword }, method, } = req;
    const { query: { id} } = req;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`;
    const headers = {
      'origin': 'localhost',
      cookie: req.headers.cookie
    }
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`)
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
