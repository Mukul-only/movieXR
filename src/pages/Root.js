import { Outlet } from "react-router-dom";
import MainNavigation from "../components/nav/MainNavigation";
import Footer from "../components/Footer/Footer";

const Root = (props) => {
  return (
    <>
      <MainNavigation />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Root;
