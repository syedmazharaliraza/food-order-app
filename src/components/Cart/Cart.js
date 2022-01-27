import { React, useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';

function Cart(props) {
    const [displayCheckout, setDisplayCheckout] = useState(false);

    const cartCtx = useContext(CartContext);

    const onAddItem = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const onRemoveItem = (id) => {
        cartCtx.removeItem(id);
    };

    const onOrder = () => {
        setDisplayCheckout(true);
    };

    const onSubmitHandler = async (userData) => {
        try {
            const response = await fetch("https://react-http-56bc0-default-rtdb.firebaseio.com/orders.json", {
                method: "POST",
                body: JSON.stringify({
                    userData,
                    order: cartCtx.items
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            alert("Order successfull");
        } catch (err) {
            alert(err);
        }
    }

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
            {displayCheckout && <Checkout onCancel={props.onHideCart} onConfirm={onSubmitHandler} />}
            {!displayCheckout &&
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                    {totalAmount > 0 && <button onClick={onOrder} className={classes.button}>Order</button>}
                </div>
            }
        </Modal>
    )
}

export default Cart
