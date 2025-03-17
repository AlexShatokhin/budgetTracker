import { useEffect, useState } from "react";
import {IoIosArrowBack} from "react-icons/io";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

import { useUserRegistrationMutation } from "../../api/modules/authorizationApi";

import "./register_form.scss"
import { colors } from "../../../constants/colors";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [data, {isError}] = useUserRegistrationMutation();
    const [validationError, setValidationError] = useState<boolean | null>(null);
    const [serverMessage, setServerMessage] = useState("");

    useEffect(() => {
        setValidationError(null);
    }, [email, password, confirmPassword])


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setServerMessage("Invalid email format");
            setValidationError(true);
            return;
        }

        if (password.length < 6) {
            setServerMessage("Password must be at least 6 characters long");
            setValidationError(true);
            return;
        }

        if (password !== confirmPassword) {
            setServerMessage("Passwords do not match");
            setValidationError(true);
            return;
        }

        data({email, password}).unwrap()
            .then(e => {setServerMessage(e.message); setValidationError(false)})
            .catch(e => {setServerMessage(e.data.message); setValidationError(false)});
    }

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
                    <label htmlFor="password-reg">Password</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}                      
                        id="password-reg" 
                        placeholder="Enter your password"/>
                </div>
                <div className="login-form__item">
                    <label htmlFor="conf-password-reg">Confirm password</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}                      
                        id="conf-password-reg" 
                        placeholder="Confirm your password"/>
                </div>

                <Button
                    onClick={handleSubmit} 
                    className="login-form__button" title={"Sign up"}/>
                <div className={`message ${isError || validationError ? "message-error" : "message-success"} ${validationError === null ? "hidden" : ""}`}>
                    {serverMessage}
                </div>
            </form>

        </div>

    )
}

export default RegisterForm;