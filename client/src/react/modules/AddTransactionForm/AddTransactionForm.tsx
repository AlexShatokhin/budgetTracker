import { useForm } from "react-hook-form";
import Button from "../../UI/Button/Button";
import TransactionFormInput from "./TransactionFormItems/TransactionFormInput";
import TransactionFormSelect from "./TransactionFormItems/TransactionFormSelect";
import { AmountType } from "../../types/amountType";


// defaultValues: {
//     amount: 0.0,
//     type: AmountType.INCOME,
//     category: "",
//     date: new Date().toISOString().split("T")[0],
//     description: ""
// }

type FormInput = {
    amount: number;
    type: AmountType;
    category: string;
    date: string;
    description: string;
}


const AddTransactionForm = () => {
    const {register, handleSubmit} = useForm<FormInput>({
        defaultValues: {
            amount: 0.0,
            type: AmountType.INCOME,
            category: "",
            date: new Date().toISOString().split("T")[0],
            description: ""
        }
    });
    const onSubmit = (data : any) => console.log(data);
    const pattern = new RegExp(/\d/gi);
    return (
        <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="transaction-form__wrapper">
                <TransactionFormInput id="amount" label="amount" {...register("amount", {required: true, pattern: {value: pattern, message: "invalid amount"}})}/>
                <TransactionFormSelect id="type" label="type" {...register("type")}/>
                <TransactionFormInput id="category" label="category" {...register("category", {required: true})}/>
                <TransactionFormInput id="date" label="date" {...register("date")}/>
                <TransactionFormInput id="description" label="description" {...register("description")}/>
            </div>

            <div className="transaction-form__buttons">
                <Button title={"cancel"}/>
                <Button type="submit" title={"submit"}/>
            </div>
        </form>
    )
}

export default AddTransactionForm;