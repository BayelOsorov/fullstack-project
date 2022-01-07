import axios from "axios"
import $axios from "../axiosConfig"
// import $axios from "../../axiosConfig"
import jwt_decode from "jwt-decode";
import { CalcSubPrice, calcTotalPrice } from "../utils/calcPrice"
import { ADD_AND_DELETE_CART, ADD_AND_DELETE_FAVORITES, CLEAR_COUNT_OF_CART, GET_CART, GET_FAVORITES, USER_GET_DETAIL, USER_GET_PRODUCT } from "./types"
const API = "http://localhost:8000/products"

export const getUserProducts = () => {
    return async (dispatch) => {
        const { data } = await $axios('products/')
        dispatch({
            type: USER_GET_PRODUCT,
            payload: data.rows
        })
    }
}
export const getDetail = (id) => {
    return async dispatch => {
        const { data } = await $axios('/products/' + id)
        dispatch({
            type: USER_GET_DETAIL,
            payload: data
        })
    }
}

// ! cart
export const addAndDeleteProductInCart = (product1) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        cart = {
            products: [],
            totalPrice: 0,
        };
    }
    let product = {
        product1: product1,
        count: 1,
        subPrice: 0,
    };
    product.subPrice = CalcSubPrice(product);
    let checkArr = cart.products.filter((item) => {
        return item.product1.id === product1.id;
    });
    if (checkArr.length === 0) {
        cart.products.push(product);
    } else {
        cart.products = cart.products.filter((item) => {
            return item.product1.id !== product1.id;
        });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    return {
        type: ADD_AND_DELETE_CART,
        payload: cart.products.length,
    };
};
export const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        cart = {
            products: [],
            totalPrice: 0,
        };
    }
    let checkArr = cart.products.filter((item) => {
        return item.product1.id === id;
    });
    if (checkArr.length === 0) {
        return false;
    } else {
        return true;
    }
};
export const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    return {
        type: GET_CART,
        payload: cart,
    };
};
export const changeCountProduct = (count, id) => {
    if (count < 1) {
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        cart = {
            products: [],
            totalPrice: 0,
        };
    }
    cart.products = cart.products.map((item) => {
        if (item.product1.id === id) {
            item.count = count;
            item.subPrice = CalcSubPrice(item);
        }
        return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
};
// Clear count of cart
export const clearCountOfCart = () => {
    return {
        type: CLEAR_COUNT_OF_CART,
        payload: null
    }
}

// ! favorites
export const addAndDeleteProductInFavorites = (item) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
        favorite = {
            favorites: [],
        };
    }
    let favProduct = {
        item: item,
    };
    let checkArr = favorite.favorites.filter((elem) => {
        return elem.item.id === item.id;
    });
    if (checkArr.length === 0) {
        favorite.favorites.push(favProduct);
    } else {
        favorite.favorites = favorite.favorites.filter((elem) => {
            return elem.item.id !== item.id;
        });
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    return {
        type: ADD_AND_DELETE_FAVORITES,
        payload: favorite.favorites.length,
    };
};
export const checkFavoriteInFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
        favorite = {
            favorites: [],
        };
    }
    let checkArr = favorite.favorites.filter((elem) => {
        return elem.item.id === id;
    });
    if (checkArr.length === 0) {
        return false;
    } else {
        return true;
    }
};
export const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    return {
        type: GET_FAVORITES,
        payload: favorite,
    };
};
// ! authentication
export const signUpUser = (email, password) => {
    return async dispatch => {
        try {
            let { data } = await $axios.post('user/signup', { email, password })
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('/user')
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const loginUser = (email, password) => {
    return async dispatch => {
        try {
            console.log(email, password);
            let { data } = await $axios.post('user/login', {
                password,
                email,
            });
            let decoded = jwt_decode(data.accessToken);
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('user');

            localStorage.setItem('user', JSON.stringify(decoded))

            // }
        } catch (error) {
            console.log(error + "    qweqweqweqwe");
        }
    }

}

export const logOut = () => {
    try {
        localStorage.removeItem('token')
        localStorage.removeItem('user')


    } catch (e) {
        console.log(e);
    }
};

