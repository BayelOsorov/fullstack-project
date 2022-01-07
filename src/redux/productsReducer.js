import { CLEAR_PRODUCT, CREATE_PRODUCT, DELETE_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCT } from "./types";

const INIT_STATE = {
    products: [],
    productToEdit: []
}
export const productReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return { ...state, products: state.products.concat(action.payload) }
        case GET_PRODUCT:
            return { ...state, products: action.payload }
        case GET_ONE_PRODUCT:
            return { ...state, productToEdit: action.payload }
        case CLEAR_PRODUCT:
            return { ...state, productToEdit: [] }
        default:
            return state
    }
}