import {FC, useEffect} from "react"
import {useForm } from "react-hook-form";
import Button from "../../UI/Button/Button";
import TransactionFormInput from "./TransactionFormItems/TransactionFormInput";
import TransactionFormSelect from "./TransactionFormItems/TransactionFormSelect";
import { AmountType } from "../../types/amountType";
import "./add_transaction.scss"
import { useAddNewTransactionMutation } from "../../api/modules/transactionsApi";

type FormInput = {
    amount: number;
    type: AmountType;
    category: string;
    date: string;
    time: string;
    description: string;
}

type AddTransactionFormProps = {
    onClose: () => void;
}


const AddTransactionForm : FC<AddTransactionFormProps> = ({onClose}) => {
    const {register, handleSubmit, formState,  formState : {isDirty, isSubmitSuccessful}, reset} = useForm<FormInput>({
        defaultValues: {
            amount: 0.0,
            type: AmountType.INCOME,
            category: "",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toISOString().split("T")[1].slice(0,5),
            description: ""
        }
    });
    const [addTransaction, {isError}] = useAddNewTransactionMutation();
    const pattern = new RegExp(/^\d+$/);
    const onSubmit = async (data : any) => {
        try {
            await addTransaction(data).unwrap();
            reset();
        } catch (error) {
            console.log(error)
        }
    };


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
                <TransactionFormSelect 
                    defaultValue={AmountType.INCOME}
                    values={[{value: AmountType.INCOME, label: "Income"}, {value: AmountType.EXPENSE, label: "Expense"}]}
                    id="type" 
                    label="Type" 
                    {...register("type", {required: true})}/>
                <TransactionFormInput id="category" label="Category" {...register("category", {required: true})}/>

                <div className="datetime">
                    <TransactionFormInput type="date" id="date" label="Date" {...register("date")}/>
                    <TransactionFormInput type="time" id="time" label="Time" {...register("time")}/>
                </div>

                <TransactionFormInput type="textarea" style={{height: 80}} id="description" label="Description" {...register("description")}/>
            </div>
            <div className="transaction-form__errors">
                {getFirstError()} 
                <br />
                {isError && <>Something went wrong</>}
            </div>
            <div className="transaction-form__success" style={{opacity: isSubmitSuccessful && !isDirty ? "1" : "0"}}>
                Transaction added successfully!
            </div>
            <div className="transaction-form__buttons">
                <Button onClick={() => {onClose(); reset()}} className="transaction-form__button transaction-form__cancel" title={"Cancel"}/>
                <Button className="transaction-form__button transaction-form__submit" type="submit" title={"Submit"}/>
            </div>
        </form>
    )
}

export default AddTransactionForm;