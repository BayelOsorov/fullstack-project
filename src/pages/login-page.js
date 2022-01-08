
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user-actions";
export default function Registerpage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // eslint-disable-line
    const auth = useSelector(state => state.userProducts)
    // const { loginUser, errorMSG, logSuccess } = useContext(authContext)
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.logSuccess)
            navigate('/')
    }, [auth.logSuccess])
    let message
    return (
        <>
            <div className="bodyRegister">
                <div className="containerDi">

                    <Link to="/">
                        <label
                            htmlFor="show"
                            className="close-btn fas fa-times"
                            title="close"
                        ></label>
                    </Link>

                    <div className="text">Войти</div>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (!email || !password) {

                            }
                            setIsSubmitting(true);
                            dispatch(loginUser(email, password))
                                .then((response) => {

                                })
                                .catch((error) => {
                                    console.log(error.message);
                                    Toastify({
                                        text: error.message,
                                        className: "error",
                                        style: {
                                            background:
                                                "linear-gradient(to right, rgb(71, 22, 22), red)",
                                        },
                                    }).showToast();
                                })
                                .finally(() => setIsSubmitting(false));

                        }}
                    >
                        <div className="data">
                            <label>Ваш Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="data">
                            <label>Пароль</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                autoComplete="password"
                            />
                        </div>
                        {
                            auth.logSuccess ? (<></>) : (<p style={{ color: "red" }}>{auth.errorMSG}</p>)
                        }
                        <div className="forgot-pass">
                            <Link to="/forgot">
                                <p href="#/">забыли пароль?</p>
                            </Link>
                        </div>
                        <div className="btn">
                            <div className="inner"></div>
                            <button type="submit">Войти</button>
                        </div>
                        <div className="signup-link">
                            Нет аккаунта? <Link to="/register">Регистрация</Link>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
}