import { useState, ReactNode, createContext, useContext } from "react";
import ShoppingCart from "@/components/ShoppingCart";
import { useLocalStorage } from "@/hooks/useLocalStorage";


type ShoppingCartContextLocal = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]

}

type CartItem = {
  id: number
  quantity: number

}

const ShoppingCartContext = createContext({} as ShoppingCartContextLocal)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProviderLocal({ children }: { children: ReactNode}) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  const [ isOpen, setIsOpen ] = useState(false)
  const [ product, setProduct ] = useState({})

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id == id) == null){
        return [...currItems, {id, quantity: 1}]
      }
      return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1}
          }
          return item;
        })
      }
    )
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1){
        return currItems.filter(item => item.id !== id)
      }
      return currItems.map(item => {
        if (item.id == id){
          return { item, quantity: item.quantity - 1}
        }
        return item;
      })

    })

  }


  const openCart = () => setIsOpen(true) 
  const closeCart = () => setIsOpen(false) 


  function removeFromCart(id: number){
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  const getAllCartItems = async () => {
    const response = await fetch('/api/get-all-cart', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },

    })

    const resJson = await response.json()
    // console.log('summing', Object.values(resJson.data.products).reduce((a, b) => a + b, 0))
    // console.log('typeof', resJson.data.products)
    // Having to set as array
    let cartAsArray = []
    if (resJson.products) {
      Object.values(resJson.products).map(s => {
        cartAsArray.push(s)
      })
    }
    setCartItems(cartAsArray);
  }

  const forgetCart = async () => {
    const response = await fetch('/api/forget-cart', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },

    })
    const resJson = await response.json()
    setCartItems([]);

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





  // const decreaseCartQuantity = (id: number) => {
  //   setCartItems(currItems => {
  //     // If you don't find add it
  //     if (currItems.find(item => item.id === id)?.quantity == 1) {
  //       return currItems.filter(item => item.id !== id)
  //     }

  //     // If you find it increment by one
  //     return currItems.map(item => {
  //       if (item.id == id) {
  //         return { ...item, quantity: item.quantity - 1 }

  //       }
  //       return item;
  //     })

  //   })
  // }

  // const removeFromCart = (id: number) => {
  //   setCartItems(currItems => {
  //     return currItems.filter(item => item.id !== id)
  //   })
  // }

  //const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  return (
    <ShoppingCartContext.Provider
      value={{
        // getItemQuantity,
        openCart,
        closeCart,
        products,
        getProducts,
        getProduct,
        setCartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        getAllCartItems,
        forgetCart,
        removeCartItem,
        // decreaseCartQuantity,
        // removeFromCart,
        // openCart,
        // closeCart,
        // cartQuantity,
        cartItems
      }}>
      <ShoppingCart isOpen={isOpen} />
      {/* <SideSlider openSide={isOpen}/> */}
      {children}
    </ShoppingCartContext.Provider>
  )
}