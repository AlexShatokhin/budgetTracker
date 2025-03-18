import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Checkbox from "../../UI/Checkbox/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useRedux";
import { setToken } from "../../pages/Authorization/authorizationSlice";
import { useLazyUserAuthorizationQuery } from "../../api/modules/authorizationApi";

import "./login_form.scss"
import useToggle from "../../hooks/useToggle";
import { AuthenticationResponseType } from "../../types/AuthenticationResponseType";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, toggleRememberMe] = useToggle(false);
    const [serverMessage, setServerMessage] = useState("  ");
    const [request, {
        isError
    }] = useLazyUserAuthorizationQuery();
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        request({email, password}).unwrap()
        .then(loginSuccess)
        .catch(e => setServerMessage(e.data.message));
    }

    const loginSuccess = (e : AuthenticationResponseType) => {
        dispatch(setToken({email})); 
        localStorage.setItem("token", JSON.stringify(e.token));
        setServerMessage(e.message);    
        navigate("/home")
    }

    return (
        <div className="form-wrapper">
            <form action="#" className="login-form">
                    <span className="login-title">Welcome back</span>
                    <span className="login-subtitle">Enter your email and password to access your account</span>

                    <div className="login-form__item">
                        <label htmlFor="email">Email</label>
                        <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            id="email" 
                            placeholder="Enter your email"/>
                    </div>
                    <div className="login-form__item">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}                      
                            id="password" 
                            placeholder="Enter your password"/>
                    </div>
                    <div className="login-form__item login-form__item_checkbox">
                        <Checkbox
                            name="remember"
                            value={rememberMe}
                            onChange={toggleRememberMe} 
                            id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>

                    <Button
                        onClick={handleLogin} 
                        className="login-form__button" 
                        title={"Sign in"}/>

                    <div className={`message ${isError ? "message-error" : "message-success"}`}>
                        {serverMessage}
                    </div>
                    <div className="login-form__registration">
                        <p>Don't have an account? <Link to = "/register">Sign up</Link></p>
                    </div>
            </form>
        </div>

    )
}

export default Login;