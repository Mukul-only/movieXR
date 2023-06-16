const SectionHeader = (props) => {
  return (
    <div
      className={`flex justify-between items-center space-x-8 ${props.className}`}
    >
      <span className="flex space-x-4 items-center">
        <h1 className="text-xl md:text-3xl font-black text-White">
          {props.title}
        </h1>
        <span className="block w-10 h-2 rounded-full bg-primary" />
      </span>
      <p className="text-xs md:text-base text-gray-400 hover:text-white cursor-pointer duration-200">
        show more →
      </p>
    </div>
  );
};
export default SectionHeader;
