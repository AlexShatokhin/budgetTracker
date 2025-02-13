import NotFoundImage from "../../../assets/404.png";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./not_found.scss"
import Layout from "../../components/Layout/Layout";
const NotFoundPage = () => {
    return (
        <Layout>
            <div className="error">
                <img src={NotFoundImage} alt="404 Not Found" className="error__image" />
                <div className="error__text">
                    <h1>Oops!</h1>
                    <h2>We couldn't find the page <br /> you were looking for</h2>
                    <Link to="/home">
                        <FaChevronLeft className="error__icon" />
                        Go home
                    </Link>
                </div>
            </div>
        </Layout>

    )
}

export default NotFoundPage;