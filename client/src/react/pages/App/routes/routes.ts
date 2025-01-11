import LoginPage from "../../Login/LoginPage"
import NotFoundPage from "../../NotFoundPage/NotFoundPage"

export const routes = [
    {path: "/", component: LoginPage, isPrivate: false},
    {path: "/register", component: NotFoundPage, isPrivate: false},

    {path: "/home", component: NotFoundPage, isPrivate: true},
    {path: "/transactions", component: NotFoundPage, isPrivate: true},
    {path: "/reports", component: NotFoundPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]