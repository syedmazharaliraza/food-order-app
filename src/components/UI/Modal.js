import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

function BackDrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.onClick}>
        </div>
    )
}

function ModalOverlay(props) {

    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

function Modal(props) {

    return (
        <>
           {ReactDOM.createPortal(<BackDrop onClick={props.onHideCart}/>,document.getElementById("overlays"))}
           {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById("overlays"))}
        </>
    )
}
export default Modal
