import Select from 'react-select';
import { FaRubleSign, FaEuroSign  } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";
import useStorage from '../../hooks/useStorage';
import { useState } from 'react';

const options = [
    { value: 'USD', label: <><IoLogoUsd /> USA Dollar</> },
    { value: 'EUR', label: <><FaEuroSign /> Euro</> },
    {value: "RUB", label: <><FaRubleSign /> Ruble</>}
]

const CurrencySelect = () => {
    const {setItem, getItem} = useStorage();
    const [selectedOption, setSelectedOption] = useState(getItem("currency") || options[0].value);
    return (
        <Select defaultValue={options.find(option => selectedOption === option.value)||options[0]} onChange={(option)=> {setSelectedOption(option!.value); setItem("currency", option!.value)}} styles={
            {
                control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                    width: "200px",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "0 10px",
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--color-text)",
                }),
            }
        } options={options}/>
    )
}

export default CurrencySelect;