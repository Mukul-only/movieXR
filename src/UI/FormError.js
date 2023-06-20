import { twMerge } from "tailwind-merge";
const FormError = (props) => {
  return (
    <p className={twMerge("text-red-400 text-xs md:text-sm", props.className)}>
      {props.text}
    </p>
  );
};
export default FormError;
