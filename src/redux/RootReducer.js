import { combineReducers } from "redux";
import { productReducer } from "./productsReducer";

export const rootReducer = combineReducers({
    products: productReducer
})