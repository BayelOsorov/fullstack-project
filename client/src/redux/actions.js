import { CLEAR_PRODUCT, CREATE_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCT, USER_GET_COUNT, USER_GET_PRODUCT } from "./types"
import { getProducts } from "./user-actions"
import $axios from "../axiosConfig"
const API = "http://localhost:8000/products"

export const createProduct = (product) => {
    return async dispatch => {
        await $axios.post('products/create', product)
        dispatch({
            type: CREATE_PRODUCT,
            payload: product
        })
    }
}
export const getProductToEdit = (id) => {
    return async dispatch => {
        const product = await $axios('products/' + id)
        dispatch({
            type: GET_ONE_PRODUCT,
            payload: product.data
        })
    }
}
export const deleteProduct = (id) => {
    return async dispatch => {
        await $axios.delete('products/' + id)
        dispatch(getProducts())
    }
}
export const saveEditedProduct = (product) => {
    return async dispatch => {
        await $axios.patch('products/' + product.id, product)
        dispatch(getProducts())
    }
}
export const clearProduct = () => {
    return {
        type: CLEAR_PRODUCT
    }
}