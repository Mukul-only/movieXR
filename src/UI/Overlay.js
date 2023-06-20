import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import SVG from "../svg/SVG";
import Cross from "../svg/Cross";
import Form from "../components/EditMovie/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formDataAction } from "../store/formData-slice";
import { formValidationAction } from "../store/formValidation-slice";
import writeData from "../ApiCalls/writeData";
import { useParams } from "react-router-dom";
import ErrorElement from "./ErrorElement";
import AuthForm from "../auth/AuthForm";
const Modal = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState([
    <Form index={0} key={0} onDelete={(ele) => deleteHandler(ele)} />,
  ]);
  const { formIsValid } = useSelector((state) => state.formValidation);
  const { formData } = useSelector((state) => state.formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const movieId = params.movieId;
  const access = localStorage.getItem("access") ? true : false;
  const linkAddHandler = () => {
    setForm((prev) => [
      ...prev,
      <Form
        index={prev.length}
        key={prev.length}
        onDelete={(ele) => deleteHandler(ele)}
      />,
    ]);
    dispatch(formValidationAction.setTouched(false));
  };

  const deleteHandler = (ele) => {
    dispatch(formDataAction.removeFormData(ele));
    dispatch(formValidationAction.removeFeildValidity(ele));
    dispatch(formDataAction.toogleFlag());
    setForm((prev) => prev.filter((item, index) => index !== prev.length - 1));
  };

  const submitHandler = () => {
    dispatch(formValidationAction.setTouched(true));
    if (formIsValid) {
      writeData(formData, setIsSubmitting, setError, movieId, props.onClick);
      dispatch(formDataAction.reset());
      dispatch(formValidationAction.reset());
    }
  };

  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      unmountOnExit
      mountOnEnter
      classNames={{ enterActive: "enter", exitActive: "exit" }}
    >
      <div
        className="fixed inset-0 flex items-center justify-center bg-transparent-black z-20 py-10 px-4 md:py-12 md:px-24 xl:py-28 xl:px-52 "
        onClick={() => props.onClick(false)}
      >
        <div
          className="relative pb-16  rounded-xl bg-background border-2 border-Gray h-full w-full  modal overflow-y-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="flex justify-between space-x-4 items-center sticky top-0 left-0 right-0 z-10 bg-background py-5 px-6 lg:px-16 border-b border-Dark-700">
            <h1 className="text-xl md:text-2xl font-black  rounded-lg border-l-8 border-primary pl-4 md:pl-6 py-2">
              Edit Movie
            </h1>
            <SVG
              svg={Cross}
              className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer fill-gray-400 hover:fill-white "
              onClick={() => props.onClick(false)}
            />
          </span>
          {access ? (
            <>
              <div className="px-6 lg:pl-16 w-full lg:w-[60%]">
                {form}
                <p
                  className="select-none text-gray-400 hover:text-white text-sm font-semibold cursor-pointer py-4 w-max"
                  onClick={linkAddHandler}
                >
                  + add more links
                </p>
              </div>

              <button
                className={`block text-semibold px-10 py-2 rounded-full mx-auto my-6  bg-primary hover:bg-primary-500 duration-300 ${
                  isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={submitHandler}
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </>
          ) : (
            <AuthForm close={() => props.onClick(false)} />
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
const Overlay = (props) => {
  const overlay = document.querySelector("#overlays");
  return ReactDOM.createPortal(
    <Modal show={props.show} onClick={props.onClick} />,
    overlay
  );
};
export default Overlay;
