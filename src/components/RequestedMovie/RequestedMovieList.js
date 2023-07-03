import AltCard from "../Landingpage/AltCard";
import { authenticator } from "../../UI/Overlay";
import { useSelector } from "react-redux";
const RequestedMovieList = ({ data }) => {
  const accessKey = localStorage.getItem("access");
  const access = accessKey ? authenticator(accessKey) : false;
  // const totalResults = data ? Object?.keys(data).length : 0;
  const dataArr = data ? Object?.values(data) : [];
  const { ip } = useSelector((state) => state.ip);
  let requestList = [];
  if (access) {
    requestList = dataArr;
  } else {
    requestList = dataArr.filter((item) => item?.ips?.has(ip));
  }

  return (
    <>
      <p className="mt-1 text-xs text-gray-400 md:text-sm">
        results : {requestList.length}
      </p>
      <div className="mt-6 grid-movie">
        {requestList.map((item) => (
          <AltCard key={item.id} data={item} className="w-full md:w-[204px] " />
        ))}
      </div>
      {requestList.length === 0 && (
        <p className="mt-12 font-semibold text-center text-Gray-500">
          Requested Movies list is empty!
        </p>
      )}
    </>
  );
};
export default RequestedMovieList;
