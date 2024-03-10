import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import ShoppingCart from "@/components/ShoppingCart";
import dynamic from 'next/dynamic'
import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { getFromLocalStorage, setToLocalStorage } from "@/hooks/useLocalStorageNew";


type ShoppingCartContextLocal = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
  getProduct: (id: number) => any
  products: []
  getProducts: () => Promise<void>

}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContextLocal = createContext({} as ShoppingCartContextLocal)

export function useShoppingCartLocal() {
  return useContext(ShoppingCartContextLocal)
}

export function ShoppingCartProviderLocal({ children }: { children: ReactNode}) {
  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // const getInitialState = async() => {
  //     const resp = await fetch('/api/get-cookie', {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //         }
  //             })

  //     const resJson = await resp.json()
  //     return resJson.cart ? resJson.cart : [];

  // }


  const [ isOpen, setIsOpen ] = useState(false)
  const [ products, setProducts ] = useState([])
  const [ product, setProduct ] = useState({})

  // const cartQuantity =  cartItems?.reduce(
  //   (quantity, item) => item.quantity + quantity,
  //   0
  // )

  // let cartQuantity;
  // if (cartItems.length === 0) {
  //   cartQuantity = 0
  // }
  // else {
  //   cartQuantity = cartItems?.reduce(
  //   (quantity, item) => item.quantity + quantity,
  //   0
  // )

  // }

  useEffect(() => {
    const setTheCart = async () => {
      const resp = await fetch('/api/get-cookie', {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
              })

      const resJson = await resp.json()
      setCartItems(resJson.cart ? resJson.cart : []);
    }
    setTheCart()
  }, [])

  useEffect(() => {
    const setCookieWhenChanged = async() => {
      if (cartItems && cartItems.length > 0) {
        const resp = await fetch('/api/set-cookie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItems })
        })

        const resJson = await resp.json()
        return 
      }

    }
    setCookieWhenChanged()

  }, [cartItems])


  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    const currItems = cartItems
    // If the item is not found
    if (currItems.find(item => item.id == id) == null){
      setCartItems([...currItems, {id, quantity: 1}])
      return
    }
    // If the item is found
    const updatedCurrItems = currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1}
        }
        return item;
      })
    setCartItems(updatedCurrItems)
  }


   function increaseCartQuantityOld(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    const currItems = cartItems
    if (currItems.find(item => item.id === id)?.quantity === 1){
      setCartItems(currItems.filter(item => item.id !== id))
      return
    }
    const updatedCurrItems = currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1}
        }
        return item;
      })
    setCartItems(updatedCurrItems)

  }

  const getProducts = async () => {
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }

    })

    const resJson = await response.json();

    setProducts(resJson.products)

  }



  const openCart = () => setIsOpen(true) 
  const closeCart = () => setIsOpen(false) 


  function removeFromCart(id: number){
    const currItems = cartItems
    setCartItems(currItems.filter(item => item.id !== id))
  }




  const getProduct = async (id: number) => {
    const response = await fetch(`/api/product?id=${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }

    })

    const resJson = await response.json();
    return resJson.products

    // setProducts(resJson.products)

  }


  return (
    <ShoppingCartContextLocal.Provider
      value={{
        getItemQuantity,
        openCart,
        closeCart,
        getProduct,
        getProducts,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        // cartQuantity,
        cartItems,
        products
      }}>
      <ShoppingCart isOpen={isOpen} />
      {children}
    </ShoppingCartContextLocal.Provider>
  )
}