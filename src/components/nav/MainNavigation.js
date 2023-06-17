import Card from "../../UI/Card";
import Brand from "../../svg/Brand";
import SVG from "../../svg/SVG";
import { Link } from "react-router-dom";
const MainNavigation = (props) => {
  return (
    <div className="border-b border-Gray">
      <Card className="flex justify-between items-center py-3">
        <Link to="/">
          <SVG svg={Brand} className="w-24 md:w-36" />
        </Link>
      </Card>
    </div>
  );
};
export default MainNavigation;
