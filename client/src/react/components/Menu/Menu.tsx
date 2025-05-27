import { FaHome } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import MenuLink from "./UI/MenuLink";

import "./menu.scss"
import { useTypedDispatch } from "../../hooks/useRedux";
import { removeToken } from "../../pages/Authorization/authorizationSlice";
import useWindowDimensions from "../../hooks/useWindowDimensions";


const routes = [
    {path: "/home", name: "Home", icon: <FaHome />},
    {path: "/transactions", name: "Transactions", icon: <FaDollarSign />},
    {path: "/reports", name: "Reports", icon: <IoStatsChart />}
]
const Menu = () => {
    const dispatch = useTypedDispatch();
    const {width} = useWindowDimensions();
    const isMobile = width <= 1200;
    const logout = () => {
        dispatch(removeToken());
        localStorage.removeItem("token");
    }

    return (
        <nav className="menu">
            <ul className="menu__list">
                {routes.map(route => (
                    <MenuLink 
                        key={route.path} 
                        route={route.path} 
                        name={isMobile ? "" : route.name} 
                        icon={route.icon}/>
                ))}
            </ul>
            <ul className="menu__footer">
                <MenuLink route={"/settings"} name={isMobile ? "" : "Settings"} icon={<IoMdSettings />}/>
                <MenuLink onClick={logout} route={"/"} name={isMobile ? "" : "Log Out"} icon={<MdOutlineLogin />}/>
            </ul>
        </nav>
    )
}

export default Menu;