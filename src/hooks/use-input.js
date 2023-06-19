import { useState } from "react";

const useInput = (validateValue) => {
  const [input, setInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isInputValid = validateValue(input);
  const hasError = !isInputValid && isTouched;

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setInput("");
    setIsTouched(false);
  };
  return {
    value: input,
    setInput,
    isValid: isInputValid,
    hasError,
    setIsTouched,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
