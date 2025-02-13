import AutorizationPage from "../../Authorization/AuthorizationPage"
import HomePage from "../../HomePage/HomePage"
import NotFoundPage from "../../NotFoundPage/NotFoundPage"

export const routes = [
    {path: "/", component: AutorizationPage, isPrivate: false},
    {path: "/register", component: AutorizationPage, isPrivate: false},

    {path: "/home", component: HomePage, isPrivate: false},
    {path: "/transactions", component: NotFoundPage, isPrivate: true},
    {path: "/reports", component: NotFoundPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]