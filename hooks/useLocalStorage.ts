import { useEffect, useState } from 'react'



export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {


    console.log('here you hare')
    const [ value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const jsonValue = window.localStorage.getItem(key)
            if (jsonValue != null || jsonValue !== '') return JSON.parse(jsonValue)

            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            }
            return initialValue;

        }
        return []

    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]



}