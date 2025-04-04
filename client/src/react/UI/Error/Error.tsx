import {FC} from "react"

type ErrorProps = {
    width?: number;
    height?: number;
}

const Error : FC<ErrorProps> = ({width = 400, height = 400}) => {
    return (
        <div className="full-wrapper">
            <img style={{width, height}} src={require("../../../assets/error.png")} alt="Internal Error" />
        </div>
    )
}

export default Error;