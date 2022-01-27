import {useState} from 'react';

function useInputValidate(validationFunction) {
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    const onChangeHandler = (e) =>{
        setIsValid(true);
        if(!validationFunction(e.target.value)){
            setIsValid(false);
        }
        setInputValue(e.target.value);
    };

    const onBlurHandler = () =>{
        if (!validationFunction(inputValue) && isValid === true) {
            setIsValid(false);
        }
    };

    return {
        inputValue,
        isValid,
        onChangeHandler,
        onBlurHandler
    }
}

export default useInputValidate;
