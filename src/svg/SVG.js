const SVG = (props) => {
  return (
    <div className={`relative ${props?.className}`} onClick={props.onClick}>
      <props.svg className={`w-full h-full ${props?.svgClass}`} />
    </div>
  );
};
export default SVG;
