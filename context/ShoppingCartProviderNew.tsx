import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import ShoppingCart from "@/components/ShoppingCart";


type ShoppingCartContextNew = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  removeFromCart: (id: number) => void
  getProduct: (id: number) => any
  products: []
  getProducts: () => Promise<void>

}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContextNew = createContext({} as ShoppingCartContextNew)

export function useShoppingCartNew() {
  return useContext(ShoppingCartContextNew)
}

export function ShoppingCartProviderNew({ children }: { children: ReactNode}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [ isOpen, setIsOpen ] = useState(false)
  const [ products, setProducts ] = useState([])

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


  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantityNew(id: number) {
    const currItems = cartItems
    // If the item is not found
    if (currItems.length !== 0 && currItems.find(item => item.id == id) == null){
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


   function increaseCartQuantity(id: number) {
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
    <ShoppingCartContextNew.Provider
      value={{
        getItemQuantity,
        openCart,
        closeCart,
        getProduct,
        getProducts,
        removeFromCart,
        products
      }}>
      <ShoppingCart isOpen={isOpen} />
      {children}
    </ShoppingCartContextNew.Provider>
  )
}