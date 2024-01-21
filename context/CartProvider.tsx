import { useEffect, useState, createContext } from "react";
import React from "react";

type Props = {
  children: JSX.Element
}

export interface CartProduct {
  id: number;
  price: number;
  image: string;
  category: string;
  title: string;
}
export interface CartItem extends CartProduct {
  quantity: number;

}

export type CartContextType = {
  cartItems: CartItem [];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType | null>(null)

const CartProvider = ({ children } : Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)

    if (isItemInCart){
        setCartItems(
            cartItems.map((cartItem) => 
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1}
              : cartItem
            )
        )
    } else {
        setCartItems([...cartItems, { ...item, quantity: 1}])
    }

  }

  const clearCart = () => {
    setCartItems([])
  }

  const removeFromCart = (product: CartProduct) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === product.id)
    
    if (isItemInCart?.quantity == 1) {
        // Remove the item, keep the rest
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id))
    } else {
        setCartItems(
            cartItems.map((cartItem) => 
             cartItem.id === product.id
             ? { ...cartItem, quantity: cartItem.quantity -1}
             : cartItem
            )
        )
    }

  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems")
    if (cartItems) {
      setCartItems(JSON.parse(cartItems))
    }
  }, [])


  return (
    <CartContext.Provider
        value={{ 
           cartItems,
           addToCart,
           removeFromCart,
           clearCart,
           getCartTotal

         }}>
      {children}
    </CartContext.Provider>

  )
};

export default CartProvider;
