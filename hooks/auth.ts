import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import React from 'react'
import axios from '@/lib/axios'
import { z } from 'zod'


interface BaseProps {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>,
  email: string,
  password: string,
}

interface RegisterProps extends BaseProps {
  name: string,
  password_confirmation: string
}


export const useAuth = ({ middleware }: { middleware: string}) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  const csrf = async () => axios.get("/sanctum/csrf-cookie")

  const { data: user, error, mutate } = useSWR("/api/user",
    async () => await axios.get("/api/user")
      .then(response => response.data)
      .catch(error => {
        if (error.response.status !== 409) {
          throw error;
        }
      })
  )

  const login = async ({ setErrors, ...props}: BaseProps) => {
    setErrors([])

    await csrf()

    axios.post('/login', props)
    .then(() => router.push('/'))
    .catch(error => {
      console.log(error)
      if (error.response.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors))
    })
  }

  const loginForTrpc = async ({ setErrors, ...props}: BaseProps) => {
    setErrors([])

    await csrf()

    axios.post('/login', props)
    .then(() => router.push('/'))
    .catch(error => {
      console.log(error)
      if (error.response.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors))
    })
  }

  const register = async ({ setErrors, ...props}: RegisterProps) => {
    setErrors([])

    // await csrf()

    axios.post('/register', props)
    .then(() => router.push('/dashboard'))
    .catch(error => {
      console.log(error)
      if (error.response.status !== 422) throw error;
      setErrors(Object.values(error.response.data.errors))
    })
  }

  const logout = async ({ setErrors}: { setErrors: React.Dispatch<React.SetStateAction<string[]>>}) => {
    await csrf()
    await axios.post("/logout")
    .then(() => router.push("/login"))
    .catch(error => {
      console.log(error)
      if (error.response.status !== 422) throw console.log('Hey');
      setErrors(Object.values(error.response.data.errors))
    })
  }

  useEffect(() => {
    if (user || error) {
      setIsLoading(false)

      if (middleware === "guest" && user) {
        console.log(user)
        router.push("/")
      }
      if (middleware === "auth" && error) router.push("/login") 
    }
  })

  return {
    user,
    csrf,
    isLoading,
    login,
    logout,
    register
  }
}