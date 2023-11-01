import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


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

const CART_ACTION_TYPES = {
    SETISCARTOPEN : "SETISCARTOPEN",
    SETCARTITEMS : "ADDITEMSTOCART",
}

export const cartReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SETCARTITEMS :
            return {
                ...state,
                ...payload
            }
            case CART_ACTION_TYPES.SETISCARTOPEN :
                return {
                    ...state,
                    isCartOpen: payload
                }
        default:
            throw new Error (`unhandled type of ${type} in cartReducer`)
    }

}


const clearCartItem = (cartItems, cartItemsToClear) => cartItems.filter((cartItem)=> cartItem.id !== cartItemsToClear.id);


export const CartContext = createContext({
    isCartOpen : false ,
    setIsCartOpen: ()=>{},
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart : ()=> {},
    cartTotal: 0,
    cartItems: []
})

const INITIAL_STATE = {
    isCartOpen : false ,
    cartCount: 0,
    cartTotal: 0,
    cartItems: []
}


export const CartProvider = ({children}) => {


    const [ {cartCount, cartTotal, isCartOpen, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE )

    const updateCartItemsReducer = (newCartItems) => {
        
        const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem)=> (
            total + cartItem.quantity * cartItem.price
        ),0);

        dispatch(
            createAction(
                CART_ACTION_TYPES.SETCARTITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    cartTotal: newCartTotal
                }
            )
        )     
    }
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToremove) => {
        const newCartItems = removecartItem(cartItems, cartItemToremove);
        updateCartItemsReducer(newCartItems);
    }
    
    const clearItemFromCart = (cartItemsToClear) => {
        const newCartItems = clearCartItem (cartItems, cartItemsToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) =>{
        dispatch (createAction(CART_ACTION_TYPES.SETISCARTOPEN,bool ))
    }

    const value = {
        isCartOpen,
        setIsCartOpen, 
        cartItems,
        addItemToCart, 
        cartCount, 
        removeItemToCart, 
        clearItemFromCart,
        cartTotal 
    };

    return (
        <div>
            <CartContext.Provider value = {value}> {children} </CartContext.Provider>
        </div>
    )
}