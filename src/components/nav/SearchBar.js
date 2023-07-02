import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import SVG from "../../svg/SVG";
import Search from "../../svg/Search";
import { useEffect, useRef, useState } from "react";
import keywordsFetch from "../../ApiCalls/keywordsFetch";
import { twMerge } from "tailwind-merge";

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
  const [inputFocus, setInputFocus] = useState(false);

  const navigate = useNavigate();
  const [keywords, setKeywords] = useState();
  const [fetching, setFetching] = useState(false);
  const submitHandler = (e) => {
    if (e.key === "Enter" && isValid) {
      navigate(`/result?query=${input}&page=1`);
      inputRef.current.blur();
      setInput("");
      if (props.closeOverlay) props.closeOverlay();
    }
  };

  const focusHandler = (e) => {
    setInputFocus(e);
  };

  useEffect(() => {
    setFetching(true);
    const keywordsFetcher = async () => {
      const keys = await keywordsFetch(input);
      setKeywords(keys);
      setFetching(false);
    };

    const identifier = setTimeout(() => {
      keywordsFetcher();
    }, 800);
    return () => {
      clearTimeout(identifier);
    };
  }, [input]);

  useEffect(() => {
    if (props.show) {
      inputRef.current.focus();
    }
  }, []);

  const keywordClickHandler = (query) => {
    setInput(query);
    inputRef.current.focus();
    setInputFocus(false);
  };

  // https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/ {prob. parent closes before listening to child..}

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setInputFocus(false);
      }
    });
  };

  return (
    <div
      className={twMerge(
        `relative ${props.show ? "block" : "hidden"} md:block `,
        props.className
      )}
      tabIndex={0}
      onBlur={handleBlur}
      onClick={props.onClick}
    >
      <div
        className={`w-full md:w-96 flex rounded-full items-center overflow-hidden  border bg-Dark-700 ${
          inputFocus ? "border-gray-500" : "border-Gray"
        } px-4    `}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search your favorite moive"
          value={input}
          onChange={(e) => {
            inputChangeHandler(e);
            if (!inputFocus) {
              setInputFocus(true);
            }
          }}
          onBlur={inputBlurHandler}
          className={`flex-1 w-0 pr-2 py-[6px]   md:text-sm bg-transparent outline-none placeholder:text-Gray-500`}
          onKeyDown={submitHandler}
          onFocus={() => focusHandler(true)}
        />
        <SVG
          svg={Search}
          className="w-6 h-6 duration-300 cursor-pointer md:w-5 md:h-5 stroke-Gray-500 fill-transparent hover:stroke-white"
          onClick={() => {
            setInputFocus(false);
            submitHandler({ key: "Enter" });
          }}
        />
      </div>
      {inputFocus && (
        <div className="absolute left-0 right-0 border top-[120%]  rounded-xl bg-Dark-700 border-Gray px-4 py-6 max-h-[500px] overflow-y-auto">
          {(!keywords || keywords.total_results === 0) && !fetching ? (
            <p className="font-semibold text-center text-Gray-500">
              No recent searches
            </p>
          ) : fetching ? (
            <div className="space-y-4">
              <span className="block w-[80%] h-3 rounded-full loading-text" />
              <span className="block w-[60%] h-3 rounded-full loading-text" />
              <span className="block w-[40%] h-3 rounded-full loading-text" />
              <span className="block w-[80%] h-3 rounded-full loading-text" />
            </div>
          ) : (
            keywords?.results?.map((item) => (
              <p
                className="py-1 font-bold text-gray-300 cursor-pointer hover:text-white"
                key={item.id}
                onClick={() => keywordClickHandler(item.title)}
              >
                {item.title}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
