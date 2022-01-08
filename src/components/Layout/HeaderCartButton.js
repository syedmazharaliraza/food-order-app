import { React, useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon.js';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context.js';

function HeaderCartButton(props) {
    const cartCtx = useContext(CartContext);

    const [animationAdded, setAnimationAdded] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setAnimationAdded(false);
        }, 300);
        if (cartCtx.items.length > 0) {
            setAnimationAdded(true);
        }
        const timer = setTimeout(() => {
            setAnimationAdded(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }

    }, [cartCtx.items])

    const noOfCartItems = cartCtx.items.reduce(
        (currNo, currItem) => {
            return currNo + currItem.amount;
        }, 0);

    let btnClasses = `${classes.button} ${animationAdded && classes.bump}`;
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{noOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
