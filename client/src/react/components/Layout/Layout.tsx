import { FC } from "react"
import Menu from "../Menu/Menu"

type LayoutProps = {
    children: React.ReactNode
}
const Layout : FC<LayoutProps> = ({children}) => {
    return (
        <div className="layout">
            <Menu />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Layout;