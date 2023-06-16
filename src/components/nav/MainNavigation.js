import Card from "../../UI/Card";
import Brand from "../../svg/Brand";
import SVG from "../../svg/SVG";

const MainNavigation = (props) => {
  return (
    <div className="border-b border-Gray">
      <Card className="flex justify-between items-center py-3">
        <SVG svg={Brand} className="w-24 md:w-36" />
      </Card>
    </div>
  );
};
export default MainNavigation;
