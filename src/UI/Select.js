import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SVG from "../svg/SVG";
import Down from "../svg/Down";
import { useDispatch, useSelector } from "react-redux";
import { formDataAction } from "../store/formData-slice";
import { formValidationAction } from "../store/formValidation-slice";

import FormError from "./FormError";
const trim = (value, length) => {
  if (value.length > length) {
    return value.slice(0, length) + "...";
  } else {
    return value;
  }
};
const Select = ({ id, name, className, options, placeholder }) => {
  const defaultValue = placeholder
    ? window.innerWidth <= 367
      ? trim(placeholder, 8)
      : trim(placeholder, 20)
    : "Select";
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const isValid = value !== defaultValue;
  const hasError = touched && !isValid;
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { touched: isTouched } = useSelector((state) => state.formValidation);
  const preVal = useSelector((state) => state.formData.formData[id]);
  const { retriveDataFlag } = useSelector((state) => state.formData);
  useEffect(() => {
    if (preVal) {
      setValue(preVal[name]);
    }
    setTouched(false);
  }, [retriveDataFlag]);

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
    setTouched(isTouched);
  }, [isTouched]);
  useEffect(() => {
    dispatch(formDataAction.setFormData({ id: id, name: name, val: value }));
  }, [value]);
  const dropDownHandler = (action) => {
    if (action === false || action === true) {
      setShowDropdown(action);
    } else {
      setShowDropdown((prev) => !prev);
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative flex justify-between cursor-pointer px-4 py-3 items-center bg-Dark-700 rounded-lg border ${
          hasError ? "border-red-500" : "border-Dark-700"
        }`}
        onClick={dropDownHandler}
        tabIndex={0}
        onBlur={() => {
          dropDownHandler(false);
        }}
      >
        <p
          className={`text-sm  lg:text-base ${
            value === defaultValue ? "text-Gray-500" : "text-white"
          }`}
        >
          {value}
        </p>
        {showDropdown && (
          <div className="absolute left-0 right-0 top-[110%] bg-Gray-400 rounded-lg border border-Dark-700  p-3 max-h-44 overflow-y-auto z-10 scrollbar">
            {options.map((item) => (
              <p
                className={`text-sm lg:text-base hover:text-white hover:bg-Dark-700 px-2 py-1 rounded-lg ${
                  value === item ? "bg-Dark-700 text-white" : "text-gray-300"
                }`}
                key={item}
                onClick={() => {
                  setValue(item);
                }}
              >
                {item}
              </p>
            ))}
          </div>
        )}
        <SVG
          svg={Down}
          className={`w-3 h-3 lg:w-4 lg:h-4 fill-white ${
            showDropdown ? "rotate-180" : ""
          } duration-300`}
        />
      </div>
      {hasError && <FormError className="" text="This feild is required" />}
    </div>
  );
};
export default Select;
