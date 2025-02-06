import { useLocation } from "react-router-dom";
import LoginForm from "../../modules/LoginForm/LoginForm";
import "./auth_page.scss"
import RegisterForm from "../../modules/RegisterForm/RegisterForm";

const LoginPage = () => {
    const location = useLocation();
    console.log(location)

    return (
        <section className="login">
            <img src={require("../../../assets/example.png")} alt="login" className="login__image" />
            <div className={`login-wrapper`}>
                <div className={`login__content ${location.pathname.includes("register") ? "login-wrapper_register" : ""}`}>
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
            
        </section>
    )
}

export default LoginPage;