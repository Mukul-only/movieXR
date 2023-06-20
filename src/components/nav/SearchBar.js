import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import SVG from "../../svg/SVG";
import Search from "../../svg/Search";
import { useRef } from "react";

const SearchBar = (props) => {
  const inputRef = useRef();
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
  const navigate = useNavigate();
  const submitHandler = (e) => {
    if (e.key === "Enter" && isValid) {
      navigate(`/result?query=${input}&page=1`);
      inputRef.current.blur();
      setInput("");
    }
  };
  return (
    <div
      className={`flex-1 md:flex-none md:w-72 flex rounded-full items-center overflow-hidden  border bg-Dark-700 border-Dark-700 px-2 md:px-3   `}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search your favorite moive"
        value={input}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        className="bg-transparent placeholder:text-Gray-500 text-sm px-2 py-1 outline-none flex-1 w-0"
        onKeyDown={submitHandler}
      />
      <SVG
        svg={Search}
        className="w-5 h-5 stroke-Gray-500 fill-transparent cursor-pointer hover:stroke-white duration-300"
        onClick={() => submitHandler({ key: "Enter" })}
      />
    </div>
  );
};
export default SearchBar;
