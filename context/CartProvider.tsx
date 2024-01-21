import { useEffect, useState, createContext } from "react";
import { CartContext } from "./CartContext";

type Props = {
  children: JSX.Element
}

type CartItem = {
  quantity: number;
  id: number;
  price: number;

}

export const CartProvider = ({ children } : Props) => {
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

  const removeFromCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id)
    
    if (isItemInCart?.quantity == 1) {
        // Remove the item, keep the rest
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))
    } else {
        setCartItems(
            cartItems.map((cartItem) => 
             cartItem.id === item.id
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
