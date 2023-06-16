const Card = (props) => {
  return (
    <div
      className={`max-w-8xl mx-auto px-6 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};
export default Card;
