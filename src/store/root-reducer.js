import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
})
/**
    rootReducer holds all the small reducers and store the key name with the small Reducer function itself. 
 */