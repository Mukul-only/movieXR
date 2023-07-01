import AltCard from "../Landingpage/AltCard";

const RequestedMovieList = ({ data }) => {
  const totalResults = data ? Object?.keys(data).length : 0;
  const dataArr = data ? Object?.values(data) : [];
  return (
    <>
      <p className="mt-1 text-xs text-gray-400 md:text-sm">
        results : {totalResults}
      </p>
      <div className="mt-6 grid-movie">
        {dataArr.map((item) => (
          <AltCard key={item.id} data={item} className="w-full md:w-[204px] " />
        ))}
      </div>
      {totalResults === 0 && (
        <p className="mt-12 font-semibold text-center text-Gray-500">
          Requested Movies list is empty!
        </p>
      )}
    </>
  );
};
export default RequestedMovieList;
