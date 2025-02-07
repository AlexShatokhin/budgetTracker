import { FC } from "react";
import {BiShow, BiHide} from "react-icons/bi";
import "./input.scss"
import { colors } from "../../../constants/colors";
import useToggle from "../../hooks/useToggle";

type InputPropsType = {
    className?: string,
    placeholder?: string,
    type?: string,
    value?: string,
    name?: string,
    id?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input : FC<InputPropsType> = ({className, value, placeholder, type, onChange, name, id}) => {
    const [showPassword, toggleShowPassword] = useToggle(false);

    return (
        <div className={`input-wrapper ${className}`}>
            <input
                name={name}
                id = {id}
                type={type === "password" && showPassword ? "text" : type || "text"}
                className={`input`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {type === "password" && (
                <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                    {showPassword ? <BiHide size={25} color={colors.grey}/> : <BiShow size={25} color={colors.grey}/>}
                </button>
            )}
        </div>
    )
}

export default Input;