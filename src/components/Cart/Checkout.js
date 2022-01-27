import classes from './Checkout.module.css';
import useInputValidate from '../../hooks/useInputValidate';

const Checkout = (props) => {

  const { inputValue: nameInputValue,
    isValid: nameIsValid,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler
  } = useInputValidate(value => value.trim() !== '');

  const { inputValue: streetInputValue,
    isValid: streetIsValid,
    onBlurHandler: streetOnBlurHandler,
    onChangeHandler: streetOnChangeHandler
  } = useInputValidate(value => value.trim() !== '');

  const { inputValue: postalInputValue,
    isValid: postalIsValid,
    onBlurHandler: postalOnBlurHandler,
    onChangeHandler: postalOnChangeHandler,
  } = useInputValidate(value => value.trim() !== '' && value.trim().length === 6);

  const { inputValue: cityInputValue,
    isValid: cityIsValid,
    onBlurHandler: cityOnBlurHandler,
    onChangeHandler: cityOnChangeHandler,
  } = useInputValidate(value => value.trim() !== '');


  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmBtnClass = formIsValid ? classes.submit : classes.submit + ' ' + classes.invalid;

  const confirmHandler = (event) => {
    event.preventDefault();
    props.onConfirm({
      name: nameInputValue,
      street: streetInputValue,
      postalCode: postalInputValue,
      city: cityInputValue
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameOnChangeHandler} onBlur={nameOnBlurHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Flat/Street</label>
        <input type='text' id='street' onChange={streetOnChangeHandler} onBlur={streetOnBlurHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code(6-Digit)</label>
        <input type='text' id='postal' onChange={postalOnChangeHandler} onBlur={postalOnBlurHandler} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' onChange={cityOnChangeHandler} onBlur={cityOnBlurHandler} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={confirmBtnClass}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;