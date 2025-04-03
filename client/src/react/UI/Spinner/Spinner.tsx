import { FC } from "react"
import { BeatLoader } from "react-spinners"
import { colors } from "../../../constants/colors";

import "./spinner.scss"

type SpinnerProps = {
    size?: number;
    color?: string;
    speedMultiplier?: number;
}

const Spinner : FC<SpinnerProps> = ({size = 30, color = colors.blue, speedMultiplier = 0.7}) => {
    return (
        <div className="loading-wrapper">
            <BeatLoader 
                size={size}
                color={color}
                speedMultiplier={speedMultiplier}/>
        </div>
    )
}

export default Spinner;