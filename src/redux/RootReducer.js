import { combineReducers } from "redux";
import { productReducer } from "./productsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    products: productReducer,
    userProducts: userReducer
})