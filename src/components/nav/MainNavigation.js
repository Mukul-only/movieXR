import Card from "../../UI/Card";
import Brand from "../../svg/Brand";
import SVG from "../../svg/SVG";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const MainNavigation = (props) => {
  return (
    <div className="sticky top-0 left-0 right-0 border-b border-Gray z-20 bg-background">
      <Card className=" flex justify-between items-center py-3 space-x-6">
        <Link to="/">
          <SVG svg={Brand} className="w-24 md:w-36" />
        </Link>
        <SearchBar />
      </Card>
    </div>
  );
};
export default MainNavigation;
