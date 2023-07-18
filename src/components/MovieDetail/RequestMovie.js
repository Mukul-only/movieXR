import { useEffect, useState } from "react";
import RequestOverlay from "./RequestOverlay";
import SVG from "../../svg/SVG";
import Add from "../../svg/Add";
import writeRequestedMovies from "../../ApiCalls/writeRequestedMovies";
import { useSelector } from "react-redux";
import readRequestedMovies from "../../ApiCalls/readRequestedMovies";
import replacer from "../../Utility/replacer";
import reviver from "../../Utility/reviver";
const RequestMovie = ({ data }) => {
  const { ip } = useSelector((state) => state.ip);
  const { userId } = useSelector((state) => state.userId);
  const [show, setShow] = useState(false);
  const [userMatched, setUserMatched] = useState("");
  const [reqData, setReqData] = useState();
  useEffect(() => {
    readRequestedMovies(data.id).then((e) => {
      if (e !== "null") {
        setReqData(JSON.parse(e, reviver));
      } else {
        setReqData(e);
      }
    });
  }, []);

  useEffect(() => {
    if (reqData && reqData !== "null" && ip !== "") {
      setUserMatched(reqData?.userIds?.has(userId) ? "matched" : "not-matched");
    }
  }, [reqData, ip]);

  // if (reqData) {
  //   console.log(JSON.parse(reqData, reviver).ips);
  // }

  const showHandler = (e) => {
    setShow(e);
  };

  const writeDataHandler = () => {
    const time = new Date().getTime();

    if (reqData === "null") {
      //if requested movie does not exists
      const userIdMap = new Map();
      userIdMap.set(userId, ip);

      const newData = { ...data, userIds: userIdMap, count: 1, time: time };

      writeRequestedMovies(data.id, JSON.stringify(newData, replacer));
    } else if (userMatched === "not-matched") {
      //if requested movie exists
      const cnt = reqData?.count + 1;
      const userIdMap = reqData?.userIds.set(userId, ip);

      const newData = {
        ...reqData,
        userIds: userIdMap,
        count: cnt,
        time: time,
      };

      writeRequestedMovies(data.id, JSON.stringify(newData, replacer));
    }
  };
  return (
    <>
      {(reqData === undefined || userMatched === "") && reqData !== "null" ? (
        <span className="h-12 mt-6 rounded-lg loading-text w-52 md:w-64" />
      ) : (userMatched === "not-matched" || reqData === "null") &&
        userMatched !== "matched" ? (
        <>
          <button
            className="flex items-center px-4 py-2 mt-8 space-x-2 font-medium duration-200 rounded-lg text-White bg-primary hover:bg-primary-500"
            onClick={() => {
              writeDataHandler();
              showHandler(true);
            }}
          >
            <SVG svg={Add} className="w-5 h-5 fill-White" />
            <span>Request this movie</span>
          </button>
          <RequestOverlay
            show={show}
            onClick={showHandler}
            setUserMatched={setUserMatched}
          />
        </>
      ) : (
        <p className="mt-6 text-sm font-semibold text-center text-Gray-500 md:text-base">
          Download likns will be available shortly
        </p>
      )}
    </>
  );
};
export default RequestMovie;
