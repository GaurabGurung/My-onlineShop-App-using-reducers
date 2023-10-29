import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {


    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }
        default :
            return state; //if non of the action type matches, we just return the current state as it is, unlike like useReducers 
    }
}
