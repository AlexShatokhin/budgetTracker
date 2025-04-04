import {FC} from "react"
import "./empty_data.scss"
type EmptyDataProps = {
    width?: number;
    height?: number;
    fontSize?: number;
}
 
const EmptyData : FC<EmptyDataProps> = ({width = 250, height = 250, fontSize = 25}) => {
    return (
        <div className="full-wrapper">
            <div className="empty-data">
                <img style={{width, height}} src={require("../../../assets/empty.png")} alt="No data available" />
                <p style={{fontSize}}>It seems like you don't have any data yet. <br /> Please add some transactions to see information.</p>
            </div>
        </div>
    )
}

export default EmptyData;