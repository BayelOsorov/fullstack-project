import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCT } from "./types"
import axios from 'axios'
const API = "http://localhost:8000/products"

export const createProduct = (product) => {
    axios.post(API, product)
    return {
        type: CREATE_PRODUCT,
        payload: product
    }
}
export const getProducts = () => {
    return async dispatch => {
        const products = await axios.get(API)
        dispatch({
            type: GET_PRODUCT,
            payload: products
        })
    }
}
export const getProductToEdit = (id) => {
    return async dispatch => {
        const product = await axios(API + '/' + id)
        dispatch({
            type: GET_ONE_PRODUCT,
            payload: product
        })
    }
}
export const deleteProduct = (id) => {
    axios.delete(API + '/' + id)
    // return {
    //     type: DELETE_PRODUCT,

    // }
}