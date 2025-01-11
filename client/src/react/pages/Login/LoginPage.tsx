import LoginForm from "../../modules/LoginForm/LoginForm";
import "./login_page.scss"

const LoginPage = () => {
    return (
        <section className="login">
            <img src={require("../../../assets/example.png")} alt="login" className="login__image" />
            <LoginForm />
        </section>
    )
}

export default LoginPage;