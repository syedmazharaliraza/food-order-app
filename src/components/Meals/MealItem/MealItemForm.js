import { React, useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props) {
    const amountRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = parseInt(amountRef.current.value);

        if (amountRef.current.value.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            alert("Please enter valid amount (0-5)");
            return;
        }
        props.addToCartHandler(enteredAmount);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountRef} label="Amount" input={{ type: "number", min: "1", max: "5", step: "1", defaultValue: "1", id: `amount_${props.id}` }} />
            <button type='submit'>+ Add</button>
        </form>
    )
}

export default MealItemForm
