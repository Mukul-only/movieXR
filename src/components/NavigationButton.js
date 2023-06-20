import SVG from "../svg/SVG";
import Arrow from "../svg/Arrow";
import { useNavigation, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavigationButton = ({ totalPage, className }) => {
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const queryParam = searchParams.get("query");

  const pageChangeHandler = (query) => {
    if (navigation.state === "loading") {
      return;
    }
    if (query === "next") {
      if (queryParam) {
        setSearchParams({ query: queryParam, page: +page + 1 });
      } else {
        setSearchParams({ page: +page + 1 });
      }
    } else if (query === "prev") {
      if (queryParam) {
        setSearchParams({ query: queryParam, page: +page - 1 });
      } else {
        setSearchParams({ page: +page - 1 });
      }
    }
  };
  return (
    <div
      className={twMerge(
        "flex space-x-4 justify-center text-sm md:text-base items-center text-white font-semibold ",
        className
      )}
    >
      {+page > 1 && (
        <button
          className="flex space-x-2 items-center   hover:text-primary duration-300 group outline-none"
          onClick={() => pageChangeHandler("prev")}
        >
          <SVG
            svg={Arrow}
            className="w-4 h-4 md:w-5 md:h-5 fill-white rotate-180 group-hover:fill-primary"
          />
          <span>Prev</span>
        </button>
      )}
      <p>{page}</p>
      {+page < totalPage && (
        <button
          className="flex space-x-2 items-center hover:text-primary duration-300 group outline-none"
          onClick={() => pageChangeHandler("next")}
        >
          <span>Next</span>
          <SVG
            svg={Arrow}
            className="w-4 h-4 md:w-5 md:h-5 fill-white group-hover:fill-primary"
          />
        </button>
      )}
    </div>
  );
};
export default NavigationButton;
