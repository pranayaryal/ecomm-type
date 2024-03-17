import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import React from "react";
import ShoppingCart from "@/components/ShoppingCart";
import ShoppingCartSlide from "@/components/ShoppingCartSlide";
import ShoppingCartTransient from "@/components/ShoppingCartTransient";
import axios from '@/lib/axios'
import { getAllProducts } from "@/lib/backend";
import { SideSlider } from '@/components/SideSlider'

type ShoppingCardProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  products: []
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  removeCartItem: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: {},
  getAllCartItems: () => Promise<void>
  setCartItems: React.Dispatch<React.SetStateAction<{}>>
  forgetCart: () => Promise<void>
  getProducts: () => Promise<void>
  setProduct: React.Dispatch<React.SetStateAction<[]>>
  getProduct: React.Dispatch<React.SetStateAction<[]>>
  openCart: () => void
  closeCart: () => void
  // setOpenSide: React.Dispatch<React.SetStateAction<boolean>>
  toggle: React.Dispatch<React.SetStateAction<boolean>>

}

type CartItem = {
  id: number
  quantity: number

}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  if (!context) {
    throw new Error(
      "useShoppingCart must be with a ShoppingCartContext"
    )
  }
  return context;
}

export function ShoppingCartProvider({ children }: ShoppingCardProviderProps) {
  const [cartItems, setCartItems] = useState([])
  const [ clickedItem, setClickedItem ] = useState({})
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({})


  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  useEffect(() => {
    getAllCartItems()

  }, [])

  useEffect(() => {
    if (isOpen) {
      const toRef = setTimeout(() => {
        setIsOpen(false);
        clearTimeout(toRef);
      }, 3000);
    }
  }, [isOpen]);


  const increaseCartQuantity = async (id: number) => {
    const data = { id, quantity: 1 }
    setClickedItem(data)
    const response = await fetch('/api/add-cart-item', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await response.json()
    if (resJson.products) {
      setCartItems(Object.values(resJson.products));
    }

  }

  const decreaseCartQuantity = async (id: number) => {
    const data = { id, quantity: 1 }
    const response = await fetch('/api/decrease-cart-item', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await response.json()
    if (resJson.products) {
      setCartItems(Object.values(resJson.products));
    }

  }

  const removeCartItem = async (id: number) => {
    const data = { id, quantity: 1 }
    const response = await fetch('/api/remove-cart-item', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await response.json()
    if (resJson.products) {
      setCartItems(Object.values(resJson.products));
    }

  }

  const getAllCartItems = async () => {
    const response = await fetch('/api/get-all-cart', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },

    })

    const resJson = await response.json()
    if (resJson.products) {
      setCartItems(Object.values(resJson.products));
    }
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
        cartItems,
        clickedItem
      }}>
      <ShoppingCartTransient isOpen={isOpen} />
      {/* <SideSlider openSide={isOpen}/> */}
      {children}
    </ShoppingCartContext.Provider>
  )
}