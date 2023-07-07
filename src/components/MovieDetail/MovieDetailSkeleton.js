import { useEffect } from "react";

const MovieDetailSkeleton = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col gap-12 py-12 border-b lg:flex-row border-Gray ">
      <div className="w-64 h-[24rem] rounded-xl loading-card mx-auto" />
      <div className="flex flex-col items-center flex-1 w-full space-y-4 lg:items-start lg:w-0">
        <span className="block w-[70%] h-6 md:h-10 loading-text rounded-lg" />
        <span className="block w-[60%] h-4 md:h-6 loading-text rounded-lg" />
        <span className="block w-[40%] h-2 md:h-4 loading-text rounded-lg" />
      </div>
    </div>
  );
};
export default MovieDetailSkeleton;
