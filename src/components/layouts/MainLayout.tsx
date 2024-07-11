import { Outlet } from "react-router-dom";
import Nav from "../ui/Nav";
import Footer from "../../pages/Footer";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="">
        <Nav></Nav>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
