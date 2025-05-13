import { useEffect, useState } from "react";
import ThemeItem from "./ThemeItem";
import "./theme_wrapper.scss"
import useStorage from "../../hooks/useStorage";

const ThemeToggling = () => {
    const {setItem, getItem} = useStorage();
    const initialTheme = getItem("theme") as "light" | "dark" || "light";
    const [choosenTheme, setChosenTheme] = useState<"light" | "dark">(initialTheme);

    useEffect(() => {
        setItem("theme", choosenTheme);
        const root = document.querySelector("#root") as HTMLHtmlElement;
        if (choosenTheme === "dark")
            root.classList.add("dark-theme")
        else
            root.classList.remove("dark-theme")
        
    },[choosenTheme])
    return (
        <div className="theme-wrapper">
            <ThemeItem setTheme={setChosenTheme} activeTheme={choosenTheme} theme="light"/>
            <ThemeItem setTheme={setChosenTheme} activeTheme={choosenTheme} theme="dark"/>
        </div>
    )
}

export default ThemeToggling;