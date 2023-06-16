import { Outlet } from "react-router-dom";
import MainNavigation from "../components/nav/MainNavigation";

const Root = (props) => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};
export default Root;
