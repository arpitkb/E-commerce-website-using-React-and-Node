import { useState } from "react";

const useInput = (validateFun) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = validateFun(enteredValue);
  const hasError = !isValueValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    isValueValid,
    value: enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
    reset,
  };
};

export default useInput;
