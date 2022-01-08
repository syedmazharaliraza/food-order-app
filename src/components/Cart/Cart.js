import { React, useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

function Cart(props) {
    const cartCtx = useContext(CartContext);

    const onAddItem = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const onRemoveItem = (id) => { 
        cartCtx.removeItem(id);
    };

    const cartItems =
        <ul className={classes['cart-items']}>{
            cartCtx.items.map(item => {
                return <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={onAddItem.bind(null, item)} onRemove={onRemoveItem.bind(null, item.id)} />
            })}
        </ul>;
    const totalAmount = cartCtx.totalAmount.toFixed(2);
    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {totalAmount > 0 && <button onClick={alert("Ordering...")} className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
