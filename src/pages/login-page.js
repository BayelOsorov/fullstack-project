
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/user-actions";
import { useDispatch } from "react-redux";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // eslint-disable-line
    const dispatch = useDispatch()
    // const { login } = useAuth();
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
                                    navigate('/')
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