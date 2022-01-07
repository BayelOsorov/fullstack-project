import { useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { signUpUser } from "../redux/user-actions";
import { useDispatch } from "react-redux";
export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)// eslint-disable-line
    //
    // const useAuth = [{ register, signInWithGoogle }]
    //
    // const { register, signInWithGoogle } = useAuth();
    const dispatch = useDispatch()
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
                    <div className="text">Регистрация</div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (!email || !password) {

                            }
                            setIsSubmitting(true);
                            dispatch(signUpUser(email, password))
                                .then((response) => {
                                    navigate('/');
                                })
                                .catch((error) => {
                                    console.log(error.message);
                                    Toastify({
                                        // text: error.message,
                                        text: 'Неправильный пароль или емаил',
                                        className: "error",
                                        style: {
                                            background:
                                                "linear-gradient(to right, rgb(71, 22, 22), red)",
                                        },
                                    }).showToast();
                                })
                                .finally(() => setIsSubmitting(false));
                        }}

                    // action="#"
                    >
                        <div className="data">
                            <label>Ваш Email</label>
                            <input
                                // value="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                            // required
                            />
                        </div>
                        <div className="data">
                            <label>Ваш пароль</label>
                            <input
                                // value="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                autoComplete="password"
                            // required
                            />
                        </div>

                        <div className="forgot-pass">

                        </div>
                        <div className="btn">
                            <div className="inner"></div>
                            <button type="submit">Регистрация</button>
                        </div>


                        <div className="signup-link">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}