
export const getFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem('shopping-cart')
        const valRet = value === '' ? [] : value;
        return valRet
    }
    return null


}

export const setToLocalStorage = (value) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('shopping-cart', value)
    }

}