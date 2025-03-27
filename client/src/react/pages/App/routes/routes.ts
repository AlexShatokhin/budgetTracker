import AutorizationPage from "../../Authorization/AuthorizationPage"
import HomePage from "../../HomePage/HomePage"
import NotFoundPage from "../../NotFoundPage/NotFoundPage"
import ReportPage from "../../ReportPage/ReportPage"
import TransactionsPage from "../../TransactionsPage/TransactionsPage"

export const routes = [
    {path: "/", component: AutorizationPage, isPrivate: false},
    {path: "/register", component: AutorizationPage, isPrivate: false},

    {path: "/home", component: HomePage, isPrivate: false},
    {path: "/transactions", component: TransactionsPage, isPrivate: true},
    {path: "/reports", component: ReportPage, isPrivate: true},

    {path: "*", component: NotFoundPage, isPrivate: false},

]