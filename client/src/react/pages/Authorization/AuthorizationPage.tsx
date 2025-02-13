import { useLocation } from "react-router-dom";
import LoginForm from "../../modules/LoginForm/LoginForm";
import "./auth_page.scss"
import RegisterForm from "../../modules/RegisterForm/RegisterForm";

const LoginPage = () => {
    const location = useLocation();

    return (
        <section className="login">
            <video className="login__image" autoPlay loop playsInline>
                <source src={require("../../../assets/auth.mp4")} type="video/mp4" />
            </video>
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