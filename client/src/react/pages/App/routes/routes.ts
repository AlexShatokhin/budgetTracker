

export const routes = [
    {path: "/", component: null, isPrivate: false},
    {path: "/register", component: null, isPrivate: false},

    {path: "/home", component: null, isPrivate: true},
    {path: "/transactions", component: null, isPrivate: true},
    {path: "/reports", component: null, isPrivate: true},

    {path: "*", component: null, isPrivate: false},

]