import Card from "../../UI/Card";
import Brand from "../../svg/Brand";
import SVG from "../../svg/SVG";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import ReqMov from "../../svg/ReqMov";
import ReqMovActive from "../../svg/ReqMovActive";
import { useDispatch } from "react-redux";
import { navigationAction } from "../../store/Navigation-slice";
const MainNavigation = (props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const page = searchParams.get("page");
  const query = searchParams.get("query");
  const clickHandler = () => {
    const url =
      location.pathname +
      (page ? `?page=${page}` : "") +
      (query ? `&query=${query}` : "");
    dispatch(navigationAction.setReqUrl(url));
  };
  return (
    <div className="sticky top-0 left-0 right-0 z-20 border-b border-Gray bg-background">
      <Card className="flex items-center justify-between py-3 space-x-6 ">
        <Link to="/">
          <SVG svg={Brand} className="w-24 md:w-36" />
        </Link>
        <span className="flex items-center flex-1 space-x-4 md:flex-none">
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
          <SearchBar />
        </span>
      </Card>
    </div>
  );
};
export default MainNavigation;
