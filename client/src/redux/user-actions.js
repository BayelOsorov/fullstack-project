import axios from "axios"
import $axios from "../axiosConfig"
// import $axios from "../../axiosConfig"
import jwt_decode from "jwt-decode";
import { CalcSubPrice, calcTotalPrice } from "../utils/calcPrice"
import { ADD_AND_DELETE_CART, ADD_AND_DELETE_FAVORITES, CLEAR_COUNT_OF_CART, GET_CART, GET_FAVORITES, USER_GET_COUNT, USER_GET_DETAIL, USER_GET_PRODUCT } from "./types"
const API = "http://localhost:8000/products"

export const getProducts = (page = '1') => {
    return async dispatch => {
        try {
            let filter = window.location.search;
            let filter1 = window.location.search;

            if (filter)
                filter += `&page=${page}`
            else
                filter += `?page=${page}`

            const { data } = await $axios(`products/${filter}`);
            if (filter1)
                filter1 += '&limit=10000'
            else
                filter1 += '?limit=10000'

            const response = await $axios(`products/${filter1}`);
            dispatch({
                type: USER_GET_COUNT,
                payload: response.data.rows.length
            })
            let action = {
                type: USER_GET_PRODUCT,
                payload: data.rows,
            };
            dispatch(action);
        } catch (e) {
            console.log(e);
        }
    }
};
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

export const signUpUser = (email, password, username) => {
    return async dispatch => {
        try {
            let res = await $axios('user');

            let { data } = await $axios.post('user/signup', {
                password,
                email,
                username
            });
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('user');
            dispatch({
                type: "LOGIN_USER",
                payload: data,
            });
            dispatch({
                type: "LOG_SUCCESS",
                payload: true,
            });
            const user = jwt_decode(data.accessToken);
            localStorage.setItem('user', JSON.stringify(user))
        } catch (e) {
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
            dispatch({
                type: "ERROR_MSG",
                payload: "User with given email has already exists"
            })
            console.log(e);
        }
    }
};
export const loginUser = (email, password) => {
    return async dispatch => {
        try {
            let res = await $axios('user');
            // if (user) {
            // if (user.password !== password) {
            //     console.log("wrong password");
            //     return
            // }
            let { data } = await $axios.post('user/login', {
                password,
                email,
            });
            localStorage.setItem('token', JSON.stringify(data))
            await $axios('user');
            dispatch({
                type: "LOGIN_USER",
                payload: data,
            });
            dispatch({
                type: "LOG_SUCCESS",
                payload: true,
            });
            const user = jwt_decode(data.accessToken);
            localStorage.setItem('user', JSON.stringify(user))

            // }
        } catch (error) {
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
            dispatch({
                type: "ERROR_MSG",
                payload: 'Wrong mail or password'
            })
            console.log(error + "qweqweqweqwe");
            // console.log(errorMSG + "qweqweqweqwe");
        }
    }
}

export const logOut = () => {
    return async dispatch => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            dispatch({
                type: "LOGOUT_USER",
                payload: null
            })
            dispatch({
                type: "LOG_SUCCESS",
                payload: false
            })
        } catch (e) {
            console.log(e);
        }
    }
};
// !  comment context

export const getComment = (productId) => {
    return async dispatch => {
        try {
            const { data } = await $axios(`comments/${productId}`)
            dispatch({
                type: 'GET_COMM',
                payload: data
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const addComment = (text, owner, productId, userId) => {
    return async dispatch => {
        try {
            let comment = {
                text,
                owner,
                productId,
                userId
            }
            console.log(comment);
            await $axios.post(`comments/create`, comment)
            dispatch(getComment(productId))
        }
        catch (e) {
            console.log(e);
        }
    }
}
export const deleteComment = (id) => {
    return async dispatch => {
        try {
            await $axios.delete(`comments/${id}`)

        }
        catch (e) {
            console.log(e);
        }
    }
}
export const getCommentById = (id) => {
    return async dispatch => {
        try {
            const { data } = await $axios(`comments/get/${id}`)
            dispatch({
                type: 'GET_COMM_BY_ID',
                payload: data
            })
        }
        catch (e) {
            console.log(e);
        }

    }
}
export const editComment = (editedComm, id, productId) => {
    return async dispatch => {
        try {
            let newComm = {
                text: editedComm
            }
            await $axios.patch(`comments/${id}`, newComm)
            dispatch(getComment(productId))
        }
        catch (e) {
            console.log(e);
        }
    }
}
