import { FC } from "react";
import {IoInformationCircleOutline} from "react-icons/io5";
import "./wrapper.scss"
import useToggle from "../../hooks/useToggle";

type WrapperProps = {
    children: React.ReactNode;
    className?: string;
    width?: string;
    height?: string;
    title: string;
    titleInfo?: string;
}

const Wrapper : FC<WrapperProps> = ({title, children, className, width = "100%", height = "100%", titleInfo}) => {
    const [isHovered, toggleIsHovered] = useToggle(false);
    

    return (
        <div style={{width, height}} className={"wrapper " + className}>
            <div className="wrapper__title">
                {title}
                {titleInfo && titleInfo.length > 20 && <IoInformationCircleOutline onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered} className="wrapper__icon"/>}
                <div className={"wrapper-info " + (isHovered ? "show" : "")}>{titleInfo}</div>
            </div>
            {children}
        </div>
    )
}

export default Wrapper;