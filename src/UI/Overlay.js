import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../components/EditMovie/Form";
import readData from "../ApiCalls/readData";
import { formValidationAction } from "../store/formValidation-slice";
import { formDataAction } from "../store/formData-slice";
import writeData from "../ApiCalls/writeData";
import { CSSTransition } from "react-transition-group";
import SVG from "../svg/SVG";
import Cross from "../svg/Cross";
import AuthForm from "../auth/AuthForm";
import ReactDOM from "react-dom";
import decryptData from "../auth/decryptData";

import shortLink from "../shortLinks/shortLink";
import afterEdit from "../components/EditMovie/afterEdit";
import FormError from "./FormError";

export const authenticator = (text) => {
  const decryptedData = decryptData(text);
  if (decryptedData === "{f4OY0-6Fq$B'lP2SHs6V8Q_") {
    return true;
  } else return false;
};
const Modal = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState([]);
  const { formIsValid } = useSelector((state) => state.formValidation);
  const { formData } = useSelector((state) => state.formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShorting, setIsShorting] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);
  const params = useParams();
  const movieId = params.movieId;
  const accessKey = localStorage.getItem("access");
  const access = accessKey ? authenticator(accessKey) : false;
  const { name: movieName } = useSelector((state) => state.movieName);
  useEffect(() => {
    if (access) {
      readData(`movies/${movieId}`).then((e) => {
        if (e) {
          setForm(
            e.map((item, index) => (
              <Form
                data={item}
                index={index}
                key={index}
                onDelete={(ele) => deleteHandler(ele)}
              />
            ))
          );
        } else {
          setForm([
            <Form index={0} key={0} onDelete={(ele) => deleteHandler(ele)} />,
          ]);
        }
      });
    }
  }, [flag]);

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

  useEffect(() => {
    // console.log(submit);
    if (submit) {
      writeData(formData, setIsSubmitting, setError, movieId).then(() => {
        if (!error) props.onClick(false);
      });
      dispatch(formDataAction.reset());
      dispatch(formValidationAction.reset());
      setSubmit(false);
      afterEdit(movieId);
    }
  }, [submit]);

  const submitHandler = () => {
    dispatch(formValidationAction.setTouched(true));
    if (formIsValid && movieName.length > 0) {
      const downloadLinks = formData.map((item) => item);

      setIsShorting(true);
      shortLink(downloadLinks, movieName).then((shortedLinks) => {
        setIsShorting(false);
        if (shortedLinks?.status === false) {
          setError(shortedLinks.message);
        } else {
          dispatch(formDataAction.updateFormLinks(shortedLinks));

          setSubmit(true);
        }
      });
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
        className="fixed inset-0 z-30 flex items-center justify-center px-4 py-10 bg-transparent-black md:py-12 md:px-24 xl:py-28 xl:px-52 "
        onClick={() => props.onClick(false)}
      >
        <div
          className="relative w-full h-full pb-16 overflow-y-auto border-2 rounded-xl bg-background border-Gray modal"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="sticky top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 space-x-4 border-b bg-background lg:px-16 border-Dark-700">
            <h1 className="py-2 pl-4 text-xl font-black border-l-8 rounded-lg md:text-2xl border-primary md:pl-6">
              Edit Movie
            </h1>
            <SVG
              svg={Cross}
              className="w-6 h-6 cursor-pointer lg:w-8 lg:h-8 fill-gray-400 hover:fill-white "
              onClick={() => props.onClick(false)}
            />
          </span>
          {access ? (
            <>
              <div className="px-6 lg:pl-16 w-full lg:w-[60%]">
                {form}
                <p
                  className="py-4 text-sm font-semibold text-gray-400 cursor-pointer select-none hover:text-white w-max"
                  onClick={linkAddHandler}
                >
                  + add more links
                </p>
                {error && typeof error === "object" ? (
                  error.map((item, index) => (
                    <FormError key={index} text={item} />
                  ))
                ) : (
                  <FormError text={error} />
                )}
              </div>
              <button
                className={`block text-semibold px-10 py-2 rounded-full mx-auto my-6  bg-primary hover:bg-primary-500 duration-300 ${
                  isSubmitting || isShorting
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={submitHandler}
                disabled={isSubmitting || isShorting ? true : false}
              >
                {isSubmitting || isShorting
                  ? isShorting
                    ? "Shorting Urls..."
                    : "Saving..."
                  : "Save"}
              </button>
            </>
          ) : (
            <AuthForm close={() => props.onClick(false)} setFlag={setFlag} />
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
