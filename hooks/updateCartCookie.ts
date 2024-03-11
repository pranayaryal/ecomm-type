import { useEffect, useState } from 'react'
import { getIronSession } from "iron-session";


export function updateCartCookie<T>(key: string, initialValue: T | (() => T)) {
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

        const [ value, setValue] = useState<T>(() => {

                if (typeof initialValue === "function") {
                    return (initialValue as () => T)()
                }
                return initialValue;

        })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]



}