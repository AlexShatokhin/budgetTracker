import { FaHome } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogin } from "react-icons/md";
import MenuLink from "./UI/MenuLink";

import "./menu.scss"


const routes = [
    {path: "/home", name: "Home", icon: <FaHome />},
    {path: "/transactions", name: "Transactions", icon: <FaDollarSign />},
    {path: "/reports", name: "Reports", icon: <IoStatsChart />}
]
const Menu = () => {

    return (
        <nav className="menu">
            <ul className="menu__list">
                {routes.map(route => (
                    <MenuLink 
                        key={route.path} 
                        route={route.path} 
                        name={route.name} 
                        icon={route.icon}/>
                ))}
            </ul>
            <ul className="menu__footer">
                <MenuLink route={"/settings"} name={"Settings"} icon={<IoMdSettings />}/>
                <MenuLink route={"/"} name={"Log Out"} icon={<MdOutlineLogin />}/>
            </ul>
        </nav>
    )
}

export default Menu;