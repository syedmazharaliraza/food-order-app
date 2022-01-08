import { React, useReducer } from 'react';
import CartContext from './cart-context';

const initialCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    let updatedCartItems;
    if (action.type === "ADD_ITEM") {
        const indexOfItem = state.items.findIndex(item => {
            return item.name === action.item.name;
        })
        if (indexOfItem > -1) {
            state.items[indexOfItem] = {
                ...state.items[indexOfItem],
                amount: state.items[indexOfItem].amount + action.item.amount
            }
            updatedCartItems = [...state.items];
        }
        else {
            updatedCartItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        const updatedCart = {
            items: updatedCartItems,
            totalAmount: updatedTotalAmount
        }
        return updatedCart;
    }
    if (action.type === "REMOVE_ITEM") {
        const indexOfItem = state.items.findIndex(item => {
            return item.id === action.id;
        })
        if (state.items[indexOfItem].amount > 1) {
            state.items[indexOfItem] = {
                ...state.items[indexOfItem],
                amount: state.items[indexOfItem].amount - 1
            }
            updatedCartItems = [...state.items];
        }

        else {
            updatedCartItems = state.items.filter((item) => {
                return item.id !== action.id;
            });
        }

        const updatedTotalAmount = state.totalAmount - state.items[indexOfItem].price;

        const updatedCart = {
            items: updatedCartItems,
            totalAmount: updatedTotalAmount
        }
        return updatedCart;
    }

};

function CartProvider(props) {

    const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState)

    const addItemToCart = (item) => {
        dispatchCart({
            type: "ADD_ITEM",
            item: item
        })
    };
    const removeItemToCart = (id) => {
        dispatchCart({
            type: "REMOVE_ITEM",
            id: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemToCart
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;
