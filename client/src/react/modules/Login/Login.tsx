import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const pressHandler = () => {

    }

    return (
        <section className="login">
            <img src="" alt="" className="login__image" />
            <div className="login__content">
                <span className="login__title"></span>
                <span className="login__subtitle"></span>

                <input
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    placeholder="email" />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="password" />

                <button onClick={pressHandler}>fetch</button>
            </div>
        </section>
    )
}

export default Login;