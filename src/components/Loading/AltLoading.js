import LoadingCard from "../../UI/LoadingCard";
const AltLoading = (props) => {
  return (
    <div className="flex space-x-6 overflow-hidden ">
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
      <LoadingCard className="min-w-[158px] h-[250px] md:w-[204px] md:h-[290px]" />
    </div>
  );
};

export default AltLoading;
