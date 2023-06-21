import readData from "../ApiCalls/readData";
import useInput from "../hooks/use-input";
import FormError from "../UI/FormError";
import { useEffect, useState } from "react";
import decryptData from "./decryptData";
import encryptData from "./ecryptData";
const AuthForm = (props) => {
  const [error, setError] = useState("");
  const [match, setMatch] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authenticating, setIsAuthenticating] = useState(false);
  const {
    value: input,
    setInput,
    isValid,
    hasError,
    isTouched,
    setIsTouched,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  } = useInput((value) => value.trim().length !== 0);
  const notMatched = isTouched && !match && submitted;
  useEffect(() => {
    if (input.trim() === "") {
      setError("This feild is required !");
    }
  }, [input]);
  const submitHandler = async () => {
    setIsAuthenticating(true);
    const authkey = await readData(`auth/key`);
    setIsAuthenticating(false);
    if (authkey) {
      const decryptedKey = decryptData(authkey);
      if (input !== decryptedKey) {
        setMatch(false);

        setSubmitted(true);
        setError("Invalid access key !");
        return;
      } else {
        localStorage.setItem("access", authkey);
        props.setFlag((prev) => !prev);
        // props.close();
        setIsTouched(false);
        setInput("");
      }
    } else {
      setError("AuthKey not found !");
    }
  };

  // const encryptHandler = () => {
  //   console.log(encryptData(input));
  // };
  return (
    <div className="flex flex-col py-12  space-y-4 px-4 lg:px-24 ">
      <span>
        <input
          type="text"
          placeholder="access key"
          value={input}
          onChange={(e) => {
            inputChangeHandler(e);
            setSubmitted(false);
          }}
          onBlur={inputBlurHandler}
          className={`block px-4 py-3 w-full rounded-lg bg-Dark-700 outline-none placeholder:text-Gray-500 border text-sm lg:text-base  ${
            hasError || notMatched
              ? "border-red-500"
              : "border-Dark-700 focus:border-Gray-500"
          }`}
        />
        {(hasError || notMatched) && <FormError text={error} />}
      </span>
      <button
        className={`block text-semibold px-10 py-2 rounded-full mx-auto my-6  bg-primary hover:bg-primary-500 duration-300 ${
          authenticating ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          setIsTouched(true);
          if (isValid) submitHandler();
        }}
        disabled={authenticating ? true : false}
      >
        {authenticating ? "Authenticating..." : "Submit"}
      </button>
      {/* <button
        className={`block text-semibold px-10 py-2 rounded-full mx-auto my-6  bg-primary hover:bg-primary-500 duration-300`}
        onClick={encryptHandler}
      >
        Encrypt
      </button> */}
    </div>
  );
};
export default AuthForm;
