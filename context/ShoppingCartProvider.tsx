import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import React from "react";
import ShoppingCart from "@/components/ShoppingCart";
import axios from '@/lib/axios'
import { getAllProducts } from "@/lib/backend";

type ShoppingCardProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: {},
  getAllCartItems: () => Promise<void>
  setCartItems: React.Dispatch<React.SetStateAction<{}>>
  forgetCart: () => Promise<void>;

}

type CartItem = {
  id: number
  quantity: number

}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCardProviderProps) {
  const [cartItems, setCartItems] = useState({})

  // const getItemQuantity = (id: number) => {
  //   return cartItems.find(item => item.id === id)?.quantity || 0
  // }
  // useEffect(() => {
  //   const getCart = async () => {
  //     const res = await getAllCartItems()
  //     console.log('set it from useEffect')
  //     setCartItems(res.products)


  //   }
  //   getCart()

  // }, [])


  const increaseCartQuantity = async (id: number) => {
    const data = { id, quantity: 1 }
    const response = await fetch('/api/add-cart-item', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await response.json()
    setCartItems(resJson);

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
    setCartItems(resJson.products);
  }

  const forgetCart = async () => {
    const response = await fetch('/api/forget-cart', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },

    })
    const resJson = await response.json()
    setCartItems({});

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
        setCartItems,
        increaseCartQuantity,
        getAllCartItems,
        forgetCart,
        // decreaseCartQuantity,
        // removeFromCart,
        // openCart,
        // closeCart,
        // cartQuantity,
        cartItems
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}