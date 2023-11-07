import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
            (cartItem)=> cartItem.id === productToAdd.id
        ); //gives a boolean value 

    if(existingCartItem){
        return (
            cartItems.map ((cartItem)=> cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
            ) 
        )
    }   
    return [...cartItems, {...productToAdd, quantity: 1 }]
}

const removecartItem = (cartItems, cartItemToremove) => {

    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === cartItemToremove.id
    )

    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== cartItemToremove.id)
    }

    return (
        cartItems.map((cartItem)=> 
            cartItem.id === cartItemToremove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    )
}

const clearCartItem = (cartItems, cartItemsToClear) => cartItems.filter((cartItem)=> cartItem.id !== cartItemsToClear.id);


export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CARTOPEN, boolean)

export const addItemToCart = (cartItems ,productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems ,cartItemToremove) => {
    const newCartItems = removecartItem(cartItems, cartItemToremove);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
    
export const clearItemFromCart = (cartItems ,cartItemsToClear) => {
    const newCartItems = clearCartItem (cartItems, cartItemsToClear);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

