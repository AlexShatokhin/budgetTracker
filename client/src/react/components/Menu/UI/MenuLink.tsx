import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type MenuLinkProps = {
    route: string,
    name: string,
    icon: JSX.Element
}

const MenuLink : FC<MenuLinkProps>  = ({route, name, icon}) => {
    const location = useLocation();

    return (
        <li className="menu__list-item" key={route}>
            <NavLink to={route} className={location.pathname === route ? "active" : ""}>
                {icon}
                {name}
            </NavLink>
        </li>
    )
}

export default MenuLink;