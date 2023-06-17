import LoadingCard from "../../UI/LoadingCard";

const TrendingSectionLoading = (props) => {
  return (
    <div className="flex space-x-4 overflow-hidden ">
      <LoadingCard className="min-w-[356px] h-[182px] md:w-[472px] md:h-[309px]" />
      <LoadingCard className="min-w-[356px] h-[182px] md:w-[472px] md:h-[309px]" />
      <LoadingCard className="min-w-[356px] h-[182px] md:w-[472px] md:h-[309px]" />
    </div>
  );
};
export default TrendingSectionLoading;
