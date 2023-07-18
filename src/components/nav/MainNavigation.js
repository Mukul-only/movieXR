import Card from "../../UI/Card";
import Brand from "../../svg/Brand";
import SVG from "../../svg/SVG";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import ReqMov from "../../svg/ReqMov";
import ReqMovActive from "../../svg/ReqMovActive";
import { useDispatch } from "react-redux";
import { navigationAction } from "../../store/Navigation-slice";
import Search from "../../svg/Search";
import SearchOverlay from "./SearchOverlay";
import { useState, useEffect } from "react";
import bell from "../../svg/bell";
import Notification from "./Notification";
import bellActive from "../../svg/bellActive";
import readNotifications from "../../ApiCalls/readNotifications";
import { useSelector } from "react-redux";
import convertIp from "../../Utility/convertIp";
import bellRedDot from "../../svg/bellRedDot";
import downloadIcon from "../../svg/downloadIcon";
const MainNavigation = (props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const [notificationData, setNotificationData] = useState();
  const { userId } = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (userId) {
      const readNotificationData = async () => {
        // const newIp = convertIp(ip);
        setLoading(true);
        const res = await readNotifications(userId);
        setNotificationData(res);
        setLoading(false);
      };
      readNotificationData();
    }
  }, [userId, flag]);

  const clickHandler = () => {
    if (location.pathname !== "/requested") {
      const url =
        location.pathname +
        (page ? `?page=${page}` : "") +
        (query ? `&query=${query}` : "");
      dispatch(navigationAction.setReqUrl(url));
    }
  };

  const notificationHandler = () => {
    setShowNotification((prev) => !prev);
  };
  window.onclick = () => {
    setShowNotification(false);
  };
  return (
    <div className="sticky top-0 left-0 right-0 z-20 border-b border-Gray bg-background">
      <Card className="relative flex items-center justify-between py-3 space-x-6 ">
        <Link to="/">
          <SVG svg={Brand} className="w-24 md:w-36" />
        </Link>
        <SearchBar />
        <span className="flex items-center space-x-2 xsl:space-x-3 md:space-x-4 md:flex-none">
          <NavLink
            to="/download_process"
            className={({ isActive }) =>
              isActive ? "fill-white" : "fill-Gray-200"
            }
          >
            <SVG svg={downloadIcon} className="w-7 h-7" />
          </NavLink>
          {showNotification ? (
            <SVG
              svg={bellActive}
              className="w-5 cursor-pointer md:w-6"
              onClick={(e) => {
                e.stopPropagation();
                notificationHandler();
              }}
            />
          ) : notificationData ? (
            <SVG
              svg={bellRedDot}
              className="w-5 cursor-pointer md:w-6"
              onClick={(e) => {
                e.stopPropagation();
                notificationHandler();
              }}
            />
          ) : (
            <SVG
              svg={bell}
              className="w-5 cursor-pointer md:w-6"
              onClick={(e) => {
                e.stopPropagation();
                notificationHandler();
              }}
            />
          )}
          <NavLink
            to="/requested"
            className={({ isActive }) =>
              isActive ? "req-active" : "req-inactive"
            }
            onClick={clickHandler}
          >
            <SVG svg={ReqMov} className="w-5 md:w-6 nfill" />
            <SVG svg={ReqMovActive} className="w-5 md:w-6 fill" />
          </NavLink>
          <SVG
            svg={Search}
            className="w-5 md:hidden stroke-Gray-200"
            onClick={() => setShowOverlay(true)}
          />
        </span>
        {showNotification && (
          <Notification
            onClick={(e) => {
              e.stopPropagation();
            }}
            data={notificationData}
            loading={loading}
            setFlag={setFlag}
            setShowNotification={setShowNotification}
          />
        )}
      </Card>
      <SearchOverlay show={showOverlay} onClick={setShowOverlay} />
    </div>
  );
};
export default MainNavigation;
