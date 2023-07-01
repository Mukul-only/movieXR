import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import SVG from "../../svg/SVG";
import RequestSvg from "../../svg/RequestSvg";
import { useEffect, useState } from "react";
const Modal = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      unmountOnExit
      mountOnEnter
      classNames={{ enterActive: "enter", exitActive: "exit" }}
    >
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4 py-10 bg-transparent-black ">
        <div
          className="relative flex flex-col items-center justify-center p-6 space-y-10 overflow-y-auto border-2 md:px-12 md:py-8 rounded-xl bg-background border-Gray modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SVG svg={RequestSvg} className="w-44 md:w-64" />
          <span className="max-w-sm space-y-1 text-center text-gray-200">
            <h1 className="text-lg font-bold md:text-xl ">
              Your request is registered!
            </h1>
            <p className="text-base font-medium md:text-lg text-Gray-500">
              Download links will be available shortly
            </p>
          </span>
          <button
            className="px-8 py-2 font-semibold rounded-lg bg-primary hover:bg-primary-500"
            onClick={() => {
              props.onClick(false);
              setTimeout(() => {
                props.setIpMatched("matched");
              }, 500);
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

const RequestOverlay = (props) => {
  const overlay = document.querySelector("#overlays");
  return ReactDOM.createPortal(
    <Modal
      show={props.show}
      onClick={props.onClick}
      setIpMatched={props.setIpMatched}
    />,
    overlay
  );
};
export default RequestOverlay;
