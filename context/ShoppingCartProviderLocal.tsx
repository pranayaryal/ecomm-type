import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import ShoppingCart from "@/components/ShoppingCart";
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
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  // useEffect(() => {
  //   const storedCartItems = getFromLocalStorage([])
  //   console.log('storedCartItems', storedCartItems)
  //   setCartItems(storedCartItems)

  // }, [])

  // useEffect(() => {
  //   setToLocalStorage(cartItems)

  // }, [cartItems])

  const [ isOpen, setIsOpen ] = useState(false)
  const [ products, setProducts ] = useState([])
  const [ product, setProduct ] = useState({})

  let cartQuantity;
  if (cartItems.length === 0) {
    cartQuantity = 0
  }
  else {
    cartQuantity = cartItems?.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  }


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
        cartQuantity,
        cartItems,
        products
      }}>
      <ShoppingCart isOpen={isOpen} />
      {/* <SideSlider openSide={isOpen}/> */}
      {children}
    </ShoppingCartContextLocal.Provider>
  )
}