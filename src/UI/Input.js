import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { formValidationAction } from "../store/formValidation-slice";
import { formDataAction } from "../store/formData-slice";
import FormError from "./FormError";
const Input = ({ inputParams, className, id, name, validation, val }) => {
  const [result, setResult] = useState({});
  const {
    value: input,
    setInput,
    isValid,
    hasError,
    setIsTouched,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  } = useInput((value) => result?.valid);
  const preVal = useSelector((state) => state.formData.formData[id]);
  const { retriveDataFlag } = useSelector((state) => state.formData);
  const { touched } = useSelector((state) => state.formValidation);

  useEffect(() => {
    if (val) setInput(val);
  }, []);

  useEffect(() => {
    if (preVal) {
      setInput(preVal[name]);
    }
    setIsTouched(false);
  }, [retriveDataFlag]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      formValidationAction.setFeildValidity({
        id: id,
        name: name,
        valid: isValid,
      })
    );
  }, [isValid]);
  useEffect(() => {
    setResult(validation(input));
    const identifier = setTimeout(() => {
      dispatch(formDataAction.setFormData({ id: id, name: name, val: input }));
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [input]);
  useEffect(() => {
    setIsTouched(touched);
  }, [touched]);
  return (
    <div className={className}>
      <input
        {...inputParams}
        value={input}
        onBlur={inputBlurHandler}
        onChange={inputChangeHandler}
        className={twMerge(
          `block px-4 py-3 rounded-lg bg-Dark-700 outline-none placeholder:text-Gray-500 border text-sm lg:text-base w-full  ${
            hasError
              ? "border-red-500"
              : "border-Dark-700 focus:border-Gray-500"
          }`
        )}
      />
      {hasError && <FormError text={result?.msg} />}
    </div>
  );
};
export default Input;
