import { useRef, useState, useEffect } from "react";
import SVG from "../svg/SVG";
import Right from "../svg/Right";
import Leftarrow from "../svg/Leftarrow";
const Carousel = (props) => {
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(0);

  const scrollref = useRef();
  const wrapperRef = useRef();
  const x = 550;
  useEffect(() => {
    setWidth(scrollref.current.scrollWidth - wrapperRef.current.clientWidth);
  }, []);

  const scrollHandler = (direction) => {
    if (direction === "left") {
      setPos((prev) => {
        if (prev + x > 0) {
          return 0;
        } else {
          return prev + x;
        }
      });
    } else {
      setPos((prev) => {
        if (prev - x < -width) {
          return -width;
        } else {
          return prev - x;
        }
      });
    }
  };

  return (
    <div
      className={`relative ${props.outerH}  overflow-hidden md:h-auto md:overflow-visible`}
    >
      <div
        className={`relative overflow-x-auto md:overflow-hidden ${props.innerH}  rounded-xl  scrollbar`}
        ref={wrapperRef}
      >
        <div
          className=" flex space-x-4 md:space-x-6  rounded-xl scroll-smooth absolute top-0 bottom-0 duration-300"
          ref={scrollref}
          style={{ left: pos }}
        >
          {props.listItems()}
        </div>
      </div>

      {pos !== 0 && (
        <div
          className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollHandler("left")}
        >
          <SVG svg={Leftarrow} className="w-10 md:w-16" />
        </div>
      )}
      {pos > -width && (
        <div
          className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2  cursor-pointer"
          onClick={() => scrollHandler("right")}
        >
          <SVG svg={Right} className="w-10 md:w-16" />
        </div>
      )}
    </div>
  );
};

export default Carousel;
