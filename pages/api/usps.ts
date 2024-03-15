// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from '@/lib/axios'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const url = 'https://api.usps.com/oauth2/v3/token';
    const headers = {
      'Content-Type': 'application/json'
    }

    const data = {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_USPS_KEY,
      client_secret: process.env.NEXT_PUBLIC_USPS_SECRET,
      scope: "addresses",
      state: ""
    }

    const respUspsTkn = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const resp = await respUspsTkn.json()

    const { access_token } = resp

    const params = req.body
    console.log('params', params)

    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const addrBaseUrl = 'https://api.usps.com/addresses/v3/address'
    const addressUrl = `${addrBaseUrl}?${queryString}`


    const respUspsAdd = await fetch(addressUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      }
    })

    const respUspsAddJson = await respUspsAdd.json()
    // const { address: { streetAddress, city, state, ZIPCode }} = respUspsAddJson
    // const { error } = respUspsAddJson
    res.status(200).json({respUspsAddJson});

  }
  catch (error) {
    res.status(200).json({error: `There was an error ${error}`})
  }

}
