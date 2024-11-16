import { message } from "antd";
import React, { createContext, useState} from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    // in this context, we will allow to add, remove, clear

    const addToCart = (item) => {

        //loop through the cart, if the cart ()
        if(cart.some((cartItem) => cartItem.id === item.id)){
            message.error("Item is already in cart");
        }
        else{
            //updating the cart by adding the item
            setCart((prevCart) => [...prevCart, item])
        }
    }

    const removeFromCart = (productId) => {
        // is currentItem NOT equal to productId --> TRUE --> stay in the array
        // is currentItem EQUAL to productId --> FALSE --> removes from the array
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
    
    const clearCart = ()=>{
        setCart([]);
    }

    const cartLogic = {
        cart,
        addToCart,
        removeFromCart,
        clearCart
    };

    return(
        <CartContext.Provider value={cartLogic}>{children}</CartContext.Provider>
    )
}

export default CartProvider;