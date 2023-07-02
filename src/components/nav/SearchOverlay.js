import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import { CSSTransition } from "react-transition-group";
const Modal = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      unmountOnExit
      mountOnEnter
      classNames={{ enterActive: "enter", exitActive: "exit" }}
    >
      <div
        className="fixed inset-0 z-30 flex justify-center px-4 py-10 md:hidden backdrop-blur-sm bg-transparent-black md:py-12 md:px-24 xl:py-28 xl:px-52 "
        onClick={() => props.onClick(false)}
      >
        <SearchBar
          onClick={(e) => {
            e.stopPropagation();
          }}
          show
          className="w-full modal h-max"
          closeOverlay={() => {
            props.onClick(false);
          }}
        />
      </div>
    </CSSTransition>
  );
};
const SearchOverlay = (props) => {
  const overlay = document.getElementById("overlays");
  return ReactDOM.createPortal(
    <Modal show={props.show} onClick={props.onClick} />,
    overlay
  );
};
export default SearchOverlay;
