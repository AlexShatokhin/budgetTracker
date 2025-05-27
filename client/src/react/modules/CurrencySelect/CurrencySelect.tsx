import Select from 'react-select';
import { FaRubleSign, FaEuroSign  } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";
import useStorage from '../../hooks/useStorage';
import { useState } from 'react';
import { colors } from '../../../constants/colors';
import useWindowDimensions from '../../hooks/useWindowDimensions';



const CurrencySelect = () => {
    const {setItem, getItem} = useStorage();
    const {width} = useWindowDimensions();
    const isSmallMobile = width <= 480;

    const options = [
        { value: 'USD', label: isSmallMobile ? <><IoLogoUsd /></> : <><IoLogoUsd /> USA Dollar</> },
        { value: 'EUR', label: isSmallMobile ? <><FaEuroSign /></> : <><FaEuroSign /> Euro</> },
        {value: "RUB", label: isSmallMobile ? <><FaRubleSign /></> : <><FaRubleSign /> Ruble</>}
    ]
    const [selectedOption, setSelectedOption] = useState(getItem("currency") || options[0].value);

    return (
        <Select defaultValue={options.find(option => selectedOption === option.value) || options[0]} onChange={(option) => { setSelectedOption(option!.value); setItem("currency", option!.value); }} styles={
            {
                control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                    width: isSmallMobile ? "100px" :"200px",
                    height: "50px",
                    borderRadius: "10px",
                    padding: "0 10px",
                }),
                option: (baseStyles) => ({
                    ...baseStyles,
                    color: colors.black,
                }),
                singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "var(--color-text)", 
                }),
            }
        } options={options} />
    )
}

export default CurrencySelect;