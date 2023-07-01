import SVG from "../../svg/SVG";
import Arrow from "../../svg/Arrow";
import Edit from "../../svg/Edit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Overlay from "../../UI/Overlay";
import { Suspense, useState } from "react";
import { lazy } from "react";
const Overlay = lazy(() => import("../../UI/Overlay"));
const PageHeader = (props) => {
  const [show, setShow] = useState(false);
  const { url } = useSelector((state) => state.navigationSlice);
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(url);
  };
  const showHandler = async (e) => {
    setShow(e);
  };
  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center space-x-1 text-xs text-gray-400 duration-200 cursor-pointer md:text-base hover:text-white group"
        onClick={backHandler}
      >
        <SVG
          svg={Arrow}
          className="w-4 h-4 rotate-180 md:w-5 md:h-5 fill-gray-400 group-hover:fill-white"
        />
        <span>back</span>
      </div>
      <SVG
        svg={Edit}
        className="w-4 h-4 cursor-pointer md:w-5 md:h-5 fill-gray-400 hover:fill-white"
        onClick={() => {
          showHandler(true);
        }}
      />

      <Suspense fallback={<></>}>
        <Overlay show={show} onClick={showHandler} />
      </Suspense>
    </div>
  );
};
export default PageHeader;
