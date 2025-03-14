import { FC, ReactElement } from "react";
import "./button.scss";

type ButtonPropsType = {
    title: string | ReactElement;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const Button : FC<ButtonPropsType> = ({title, className, onClick, disabled, type}) => {
    return (
        <button
            type={type || "button"}
            disabled={disabled}
            onClick={onClick} 
            className={`button ${className}`}>{title}</button>
    )
}

export default Button;