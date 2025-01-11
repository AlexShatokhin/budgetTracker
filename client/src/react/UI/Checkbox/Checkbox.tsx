import { ChangeEvent, FC } from "react";

type CheckboxPropsType = {
    name: string,
    id?:string,
    className?: string,
    value: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
}

const Checkbox : FC<CheckboxPropsType> = ({className, id, name, value, onChange}) => {
    return (
        <input
            className={`checkbox ${className ? className : null}`} 
            type="checkbox" 
            name={name}
            checked={value}
            onChange={onChange}
            id={id} />
    )
}

export default Checkbox;