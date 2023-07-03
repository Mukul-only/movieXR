import readRequestedMovies from "../../ApiCalls/readRequestedMovies";
import reviver from "../../Utility/reviver";
import removeReqMovies from "../../ApiCalls/removeReqMoveis";
import writeNotification from "../../ApiCalls/writeNotification";
import convertIp from "../../Utility/convertIp";
const afterEdit = async (movieId) => {
  const res = await readRequestedMovies(movieId);

  if (res && res !== "null") {
    const resData = JSON.parse(res, reviver);
    resData.ips.forEach((value, key) => {
      const ip = convertIp(key);
      writeNotification(ip, movieId, res);
    });
    removeReqMovies(movieId);
  }
};
export default afterEdit;
