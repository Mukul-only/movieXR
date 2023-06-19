import SVG from "../../svg/SVG";
import Arrow from "../../svg/Arrow";
import Edit from "../../svg/Edit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Overlay from "../../UI/Overlay";
import { useState } from "react";
const PageHeader = (props) => {
  const [show, setShow] = useState(false);
  const { url } = useSelector((state) => state.navigationSlice);
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(url);
  };
  const showHandler = (e) => {
    setShow(e);
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="flex space-x-1 items-center text-xs md:text-base text-gray-400 hover:text-white cursor-pointer duration-200 group"
        onClick={backHandler}
      >
        <SVG
          svg={Arrow}
          className="w-4 h-4 md:w-5 md:h-5 fill-gray-400 group-hover:fill-white rotate-180"
        />
        <span>back</span>
      </div>
      <SVG
        svg={Edit}
        className="w-4 h-4 md:w-5 md:h-5 fill-gray-400 hover:fill-white cursor-pointer"
        onClick={() => {
          showHandler(true);
        }}
      />
      <Overlay show={show} onClick={showHandler} />
    </div>
  );
};
export default PageHeader;
