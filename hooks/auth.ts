import useSWR from 'swr'
import axios from '@/lib/axios'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

type UseAuthProps = {
    middleware: string | '';
    redirectIfAuthenticated: string | '';
}


type LoginParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
    setStatus: Dispatch<SetStateAction<null>>;
    props: { email: string, password: string }
}

type CreateParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
}

type RegisterParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
}

type ForgotPasswordParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
    setStatus: Dispatch<SetStateAction<null>>;
    email: string;
}

type ResendEmailVerificationParams = {
    setStatus: Dispatch<SetStateAction<null>>;
}


export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterParams) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }: LoginParams) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                console.log('errLogin', error)
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordParams) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: LoginParams) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    // Moving these api routes here to use csrf()
    const createCartItem = async ({ setErrors, ...props }: CreateParams) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/increase-cart', { token: params.token, ...props })
            .then(response => console.log('it was success'))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const getCartItems = async ({ setErrors}: CreateParams) => {
        await csrf()
        setErrors([])
        axios
            .get('/api/cart')
            .then(response => console.log(response))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const getProducts = async ({ setErrors }: CreateParams) => {
        await csrf()
        setErrors([])
        axios
            .get('/api/products')
            .then(response => console.log(response))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: ResendEmailVerificationParams) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at
    //     )
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        createCartItem,
        getCartItems,
        getProducts
    }
}
