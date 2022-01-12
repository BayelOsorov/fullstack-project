
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/user-actions";
export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)// eslint-disable-line
    const auth = useSelector(state => state.userProducts)
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.logSuccess)
            navigate('/')
    }, [auth.logSuccess])
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
                    <div className="text">Registration</div>


                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (!email || !password) {

                            }
                            setIsSubmitting(true);
                            dispatch(signUpUser(email, password, username))
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

                    // action="#"
                    >
                        <div className="data">
                            <label>Email</label>
                            <input
                                // value="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                            // required
                            />
                        </div>
                        <div className="data">
                            <label>Username</label>
                            <input
                                // value="email"
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                type="text"
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
                        {
                            auth.logSuccess ? (<></>) : (<p style={{ color: "red" }}>{auth.errorMSG}</p>)
                        }
                        <div className="btn">
                            <div className="inner"></div>
                            <button type="submit">Регистрация</button>
                        </div>


                        <div className="signup-link">
                            Already have account? <Link to="/login">Login</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}