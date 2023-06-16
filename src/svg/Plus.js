const Plus = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#AD231B" />
      <path
        d="M14.75 10L14.75 19"
        stroke="white"
        strokeWidth="1.28571"
        strokeLinecap="round"
      />
      <path
        d="M10 14.75H19.5"
        stroke="white"
        strokeWidth="1.28571"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default Plus;
