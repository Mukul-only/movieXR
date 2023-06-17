import { twMerge } from "tailwind-merge";
const LoadingCard = (props) => {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-end items-start w-64 h-80 rounded-xl p-4 space-y-3 loading-card",
        props.className
      )}
    >
      <span className="w-[80%] h-3 rounded-lg" />
      <span className="w-[70%] h-2 rounded-lg" />
    </div>
  );
};
export default LoadingCard;
