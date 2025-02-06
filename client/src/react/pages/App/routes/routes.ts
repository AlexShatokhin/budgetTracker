import AutorizationPage from "../../Authorization/AuthorizationPage"
import NotFoundPage from "../../NotFoundPage/NotFoundPage"

export const routes = [
    {path: "/", component: AutorizationPage, isPrivate: false},
    {path: "/register", component: AutorizationPage, isPrivate: false},

    {path: "/home", component: NotFoundPage, isPrivate: true},
    {path: "/transactions", component: NotFoundPage, isPrivate: true},
    {path: "/reports", component: NotFoundPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]