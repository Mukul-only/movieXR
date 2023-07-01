import { Link } from "react-router-dom";
import SVG from "../../svg/SVG";
import Arrow from "../../svg/Arrow";
const SectionHeader = (props) => {
  return (
    <div
      className={`flex justify-between items-center space-x-8 select-none ${props.className}`}
    >
      <span className="flex items-center space-x-4">
        <h1 className="text-xl md:text-3xl font-black text-White overflow-hidden max-w-[6rem] xsl:max-w-[12rem] md:max-w-[26rem] whitespace-nowrap">
          {props.title}
        </h1>
        <span className="block w-10 h-2 rounded-full bg-primary" />
      </span>

      <Link
        to={props.back ? props.back : props.to}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="flex items-center space-x-1 text-xs text-gray-400 duration-200 cursor-pointer md:text-base hover:text-white group">
          {props.back ? (
            <>
              <SVG
                svg={Arrow}
                className="w-4 h-4 rotate-180 md:w-5 md:h-5 fill-gray-400 group-hover:fill-white"
              />
              <span>back</span>
            </>
          ) : (
            <>
              <span>show more</span>
              <SVG
                svg={Arrow}
                className="w-4 h-4 md:w-5 md:h-5 fill-gray-400 group-hover:fill-white"
              />
            </>
          )}
        </div>
      </Link>
    </div>
  );
};
export default SectionHeader;
