import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoute : FC = () => {
    const storedUser = localStorage.getItem("token");
    return storedUser && storedUser !== "undefined" ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;