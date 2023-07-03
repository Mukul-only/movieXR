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
  const [show, setShow] = useState(false);
  const [ipMatched, setIpMatched] = useState("");
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
      setIpMatched(reqData?.ips?.has(ip) ? "matched" : "not-matched");
    }
  }, [reqData, ip]);

  // if (reqData) {
  //   console.log(JSON.parse(reqData, reviver).ips);
  // }

  const showHandler = (e) => {
    setShow(e);
  };

  const writeDataHandler = async () => {
    if (reqData === "null") {
      const ipMap = new Map();
      ipMap.set(ip, true);

      const newData = { ...data, ips: ipMap, count: 1 };
      writeRequestedMovies(data.id, JSON.stringify(newData, replacer));
    } else if (ipMatched === "not-matched") {
      const cnt = reqData?.count + 1;
      const ipMap = reqData.ips.set(ip, true);

      const newData = { ...reqData, ips: ipMap, count: cnt };
      // console.log(newData);
      writeRequestedMovies(data.id, JSON.stringify(newData, replacer));
    }
  };
  return (
    <>
      {(reqData === undefined || ipMatched === "") && reqData !== "null" ? (
        <span className="h-12 mt-6 rounded-lg loading-text w-52 md:w-64" />
      ) : (ipMatched === "not-matched" || reqData === "null") &&
        ipMatched !== "matched" ? (
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
            setIpMatched={setIpMatched}
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
