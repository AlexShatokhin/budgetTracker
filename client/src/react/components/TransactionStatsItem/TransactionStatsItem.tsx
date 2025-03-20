import {FC} from "react"
import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import "./transaction_stats_item.scss"
import { colors } from "../../../constants/colors";

type TransactionStatsItemProps = {
    type: "INCOME" | "EXPENSE";
    value: number;
}

const TransactionStatsItem : FC<TransactionStatsItemProps> = ({type, value}) => {
    const { number } = useSpring({
        from: { number: 0 },
        number: value,
        delay: 200,
        config: { duration: 2000 },
    });

    
    return (
        <div className="transaction_stat-item">
            <div className="transaction_stat-item__icon" style={{borderColor: type === "INCOME" ? colors.green : colors.red}}>
                {type === "INCOME" ? <IoChevronDown color={colors.green} size={20}/> : <IoChevronUp color={colors.red} size={20}/>}
            </div>
            <div className="transaction_stat-item__information">
                <div className="type">
                    {type === "INCOME" ? "Income" : "Expense"}
                </div>
                <div className="value">
                    <animated.span>
                        {number.to((n) =>
                            n.toLocaleString("de-DE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                        )}
                    </animated.span>
                </div>
            </div>
        </div>
    )
}

export default TransactionStatsItem;