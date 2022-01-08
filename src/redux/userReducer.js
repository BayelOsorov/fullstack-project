import { ADD_AND_DELETE_CART, ADD_AND_DELETE_FAVORITES, CLEAR_COUNT_OF_CART, GET_CART, GET_FAVORITES, USER_GET_COUNT, USER_GET_DETAIL, USER_GET_PRODUCT } from "./types"

const INIT_STATE = {
    products: [],
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
    productDetails: null,
    cart: null,
    productsCountInFavorites: JSON.parse(localStorage.getItem('favorite')) ? JSON.parse(localStorage.getItem('favorite')).favorites.length : 0,
    favorites: null,
    countOfProducts: 0,
    user: null,
    logSuccess: false,
    errorMSG: null,
    comments: null,
    comment: null
}
export const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_GET_PRODUCT:
            return { ...state, products: action.payload }
        case USER_GET_DETAIL:
            return { ...state, productDetails: action.payload }
        case ADD_AND_DELETE_CART:
            return { ...state, productsCountInCart: action.payload };
        case GET_CART:
            return { ...state, cart: action.payload };
        case ADD_AND_DELETE_FAVORITES:
            return { ...state, productsCountInFavorites: action.payload };
        case GET_FAVORITES:
            return { ...state, favorites: action.payload };
        case CLEAR_COUNT_OF_CART:
            return { ...state, productsCountInCart: action.payload };
        case USER_GET_COUNT:
            return { ...state, countOfProducts: action.payload }
        case "LOGIN_USER":
            return { ...state, user: action.payload }
        case "LOGOUT_USER":
            return { ...state, user: action.payload }
        case "LOG_SUCCESS":
            return { ...state, logSuccess: action.payload }
        case "ERROR_MSG":
            return { ...state, errorMSG: action.payload }
        case 'GET_COMM':
            return { ...state, comments: action.payload }
        case 'GET_COMM_BY_ID':
            return { ...state, comment: action.payload }
        default:
            return state
    }
}