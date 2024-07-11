import { NavLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#282828] text-white p-5">
      <div className="grid grid-cols-1 gap-3 lg:flex lg:justify-around lg:items-center ">
        <div className="">
          <h1 className="font-bold">CONNECT</h1>
          <div className="">
            <h1>800-527-6063 (Sales)</h1>
            <h1>800-527-6065 x2 (Support)</h1>
            <h1>support@gamil.com</h1>
          </div>
        </div>
        {/* --------------SITE LINKS----------- */}
        <div className="">
          <h1 className="font-bold">SITE LINKS</h1>
          <div className="flex flex-col">
            <NavLink to={"/products"}>Products</NavLink>
            <NavLink to={"/products"}>About Us</NavLink>
            <NavLink to={"/products"}>Cart</NavLink>
          </div>
        </div>
        {/* --------------social media------------ */}
        <div className="">
          <h1 className="font-bold">social Media</h1>
          <div className="">
            <FaFacebookF />
            <FaTwitter />
            <IoLogoInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
