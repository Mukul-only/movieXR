const MovieDetailSkeleton = (props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 py-12 border-b border-Gray">
      <div className="w-64 h-[24rem] rounded-xl loading-card mx-auto" />
      <div className="flex flex-col items-center lg:items-start flex-1 w-full  lg:w-0 space-y-4">
        <span className="block w-[70%] h-6 md:h-10 loading-text rounded-lg" />
        <span className="block w-[60%] h-4 md:h-6 loading-text rounded-lg" />
        <span className="block w-[40%] h-2 md:h-4 loading-text rounded-lg" />
      </div>
    </div>
  );
};
export default MovieDetailSkeleton;
