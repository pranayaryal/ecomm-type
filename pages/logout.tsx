import React from 'react'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'

export default function Logout() {
    const [errors, setErrors] = useState<string[]>([])
    const { logout } = useAuth({ 'middleware': 'auth' })
    useEffect(() => {
        logout({
            setErrors
        })


    }, [])
    return (
        <div>
            {errors?.length && errors.map((err, ix) => <p key={ix}>{err}</p>)}
            <div>You are logged out</div>
        </div>
    )
}
