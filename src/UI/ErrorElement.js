import { twMerge } from "tailwind-merge";
import SVG from "../svg/SVG";
import WarningSvg from "../svg/WarningSvg";
const ErrorElement = (props) => {
  return (
    <div
      className={twMerge(
        "flex  space-x-3 items-center text-gray-300 rounded-lg text-sm md:text-base px-6 py-2 font-bold  w-max " +
          props.className
      )}
    >
      <SVG svg={WarningSvg} className="w-6 h-6 md:w-8 md:h-8" />

      <p>{props.error}</p>
    </div>
  );
};
export default ErrorElement;
