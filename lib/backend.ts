import axios from '@/lib/axios'
import { Dispatch, SetStateAction } from 'react'

type CreateParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
}

export const getAllProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
    const products = await response.json()
    return products;
}

export const getProduct = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`);
    const product = await response.json()
    return product;
}

export const getCartItems = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`);
    const res = await response.json()
    console.log(res)
    return res;
}

export const increaseCart = async ({ setErrors, ...props}: CreateParams) => {
    try {
        setErrors([])
        //const _token = await getToken()
        //const data = { id, quantity, _token }
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/increase-cart`;
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data), // body data type must match "Content-Type" header
        // });
        // const csrf = () => axios.get('/sanctum/csrf-cookie')
        //await getCsrf()
        await axios.get('/sanctum/csrf-cookie')
        // await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`);
        axios
            .post(url, { ...props })
            .then(response => console.log('respIncrCart', response.data))
            .catch(error => {
                if (error.response.status !== 422) {
                    console.log(error)
                    setErrors(error.response.data.message)
                }

            })
        // const res = await response.json();
        // console.log('increaseCart', res)
        return true;

    } catch (error) {
        throw error;

    }
}

export const decreaseCart = async (id: number, quantity: number) => {
    const data = { id, quantity }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/decrease-cart`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();
    return res;
}

export const removeFromCart = async (id: number) => {
    const data = { id }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/remove-from-cart`;
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();
    return res;
}

export const getCsrf = async () => {
    await axios.get('/sanctum/csrf-cookie')
}


export const getToken = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/token`);
    const products = await response.json()
    return products;
}