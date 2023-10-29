import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories : []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => { //action = {} means, if no action is called the action still runs so that we can get a default state

    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {...state, categories: payload};
        default :
            return state;
    }
}