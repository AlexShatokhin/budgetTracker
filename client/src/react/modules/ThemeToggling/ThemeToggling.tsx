import ThemeItem from "./ThemeItem";
import "./theme_wrapper.scss"

const ThemeToggling = () => {
    return (
        <div className="theme-wrapper">
            <ThemeItem theme="light"/>
            <ThemeItem theme="dark"/>
        </div>
    )
}

export default ThemeToggling;