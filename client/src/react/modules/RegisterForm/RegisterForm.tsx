import { useState } from "react";
import {IoIosArrowBack} from "react-icons/io";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

import "./register_form.scss"
import { colors } from "../../../constants/colors";
const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className="form-wrapper register">
            <Link className="back-link" to="/"> <IoIosArrowBack color={colors.black} size={40}/></Link>
            <form action="#" className="login-form">
                <span className="login-title">Create an account</span>
                <span className="login-subtitle">Enter your details to sign up</span>

                <div className="login-form__item">
                    <label htmlFor="email-reg">Email</label>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        id="email-reg" 
                        placeholder="Enter your email"/>
                </div>
                <div className="login-form__item">
                    <label htmlFor="name-reg">Name</label>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}                      
                        id="name-reg" 
                        placeholder="Enter your name"/>
                </div>
                <div className="login-form__item">
                    <label htmlFor="password-reg">Password</label>
                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}                      
                        id="password-reg" 
                        placeholder="Enter your password"/>
                </div>

                <Button className="login-form__button" title={"Sign up"}/>
            </form>
        </div>

    )
}

export default RegisterForm;