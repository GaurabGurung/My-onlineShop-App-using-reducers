import { CART_ACTION_TYPES } from "./cart.types"

const CART_INITITAL_STATE = {
    isCartOpen : false ,
    cartItems: []
}

export const cartReducer = (state = CART_INITITAL_STATE, action = {} ) => {
    const {type, payload} = action

    switch (type) {
        case CART_ACTION_TYPES.SETCARTITEMS :
            return {
                ...state,
                cartItems: payload
            }
            case CART_ACTION_TYPES.SETISCARTOPEN :
                return {
                    ...state,
                    isCartOpen: payload
                }
        default:
            return state;
    }
}