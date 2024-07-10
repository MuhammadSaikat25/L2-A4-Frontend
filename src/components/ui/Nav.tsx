import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Nav = () => {
  const [authBtn, setAuthBtn] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-gray-700 p-6 relative">
      <div className="text-white flex justify-between items-center">
        <NavLink className={"flex items-center gap-2"} to={"/"}>
          <img className="bg-white w-[30px] rounded-full" src={logo} alt="" />
          <img
            src="https://shop.lifefitness.com/cdn/shop/files/Life-Fitness_Logo-800-white_350x.png?v=1681999129"
            alt=""
            className="w-[100px]"
          />
        </NavLink>
        <div className="font-semibold text-[15px] flex items-center gap-5">
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/Product-Management"}
          >
            Product Management
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/Product-Details"}
          >
            Product Details
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/Cart-Page"}
          >
            Cart
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/Checkout-page"}
          >
            Checkout
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            to={"/About-Page"}
          >
            About Us
          </NavLink>
        </div>
        <div className="flex items-center gap-6 cursor-pointer">
          <CiSearch size={20} />
          <FaUser onClick={() => setAuthBtn(!authBtn)} size={20} />
          <IoBagHandleSharp size={20} />
        </div>
      </div>
      {authBtn && (
        <div className="absolute bg-gray-400 top-16 right-10 px-4 rounded-md py-2 font-semibold">
          {user ? (
            <NavLink to={""}>logout</NavLink>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
