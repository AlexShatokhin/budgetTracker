import {FC, useEffect} from "react"
import {useForm } from "react-hook-form";
import Button from "../../UI/Button/Button";
import TransactionFormInput from "./TransactionFormItems/TransactionFormInput";
import TransactionFormSelect from "./TransactionFormItems/TransactionFormSelect";
import { AmountType } from "../../types/amountType";
import "./add_transaction.scss"

type FormInput = {
    amount: number;
    type: AmountType;
    category: string;
    date: string;
    description: string;
}

type AddTransactionFormProps = {
    onClose: () => void;
}


const AddTransactionForm : FC<AddTransactionFormProps> = ({onClose}) => {
    const {register, handleSubmit, formState, reset} = useForm<FormInput>({
        defaultValues: {
            amount: 0.0,
            type: AmountType.INCOME,
            category: "",
            date: new Date().toISOString().split("T")[0],
            description: ""
        }
    });
    const onSubmit = (data : any) => console.log(data);
    const pattern = new RegExp(/^\d+$/);

    useEffect(() => {
     
        return () => {
            console.log("unmount")
            reset();
        }
    }, [])

    const getFirstError = () : string => {
        const formFields = Object.keys(formState.errors) as (keyof FormInput)[];
        let error = ""
        formFields.forEach((field) => {
            if(formState.errors[field] && error === ""){
                error = formState.errors[field]?.message || `Field "${field}" is required`;
            }
        })
        return error
    }


    return (
        <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="transaction-form__wrapper">
                <TransactionFormInput id="amount" label="Amount" {...register("amount", {required: true, pattern: {value: pattern, message: "Type correct amount"}})}/>
                <TransactionFormSelect id="type" label="Type" {...register("type", {required: true})}/>
                <TransactionFormInput id="category" label="Category" {...register("category", {required: true})}/>
                <TransactionFormInput type="date" id="date" label="Date" {...register("date")}/>
                <TransactionFormInput type="textarea" style={{height: 80}} id="description" label="Description" {...register("description")}/>
            </div>
            <div className="transaction-form__errors">
                {getFirstError()}
            </div>
            <div className="transaction-form__buttons">
                <Button onClick={() => {onClose(); reset()}} className="transaction-form__button transaction-form__cancel" title={"cancel"}/>
                <Button className="transaction-form__button transaction-form__submit" type="submit" title={"submit"}/>
            </div>
        </form>
    )
}

export default AddTransactionForm;