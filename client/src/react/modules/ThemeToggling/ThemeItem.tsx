import {FC} from "react"
import lightTheme from "../../../assets/light_theme.svg";
import darkTheme from "../../../assets/dark_theme.svg";

import "./theme_item.scss"

type ThemeItemType = "light" | "dark";
type ThemeItemProps = {
    theme: ThemeItemType
    setTheme: (theme: ThemeItemType) => void;
    activeTheme: ThemeItemType;
}

const ThemeItem: FC<ThemeItemProps> = ({theme, setTheme, activeTheme}) => {
    const isLightTheme = theme === "light";
    return (
        <div onClick={() => setTheme(theme)} className="theme-item">
            <div className="theme-item__image">
                <img src={isLightTheme ? lightTheme : darkTheme} alt={isLightTheme ? "light theme" : "dark theme" } />
            </div>
            <div className="theme-item__label">
                <input type="radio" name="theme-toggler" checked={activeTheme === theme} id={isLightTheme ? "light-theme" : "dark-theme" } />
                <label htmlFor={isLightTheme ? "light-theme" : "dark-theme" }>{isLightTheme ? "Light mode" : "Dark mode"}</label>
            </div>
        </div>
    )
}

export default ThemeItem;