import { useState, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import {
  openNavBar,
  closeNavBar,
  toggleRegisterBtn,
  toggleAboutButton,
} from "../../store/stateStore";
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignOut/SignOut";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navBarState = useSelector((store) => store.stateStore.navState);
  const isUser = useSelector((store) => store.stateStore.isUser);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function checkScreenSize() {
      setIsSmallScreen(window.matchMedia("(max-width: 1023px)").matches);
    }
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleNavBtn = () => {
    if (navBarState === false) {
      dispatch(openNavBar(true));
    } else {
      dispatch(closeNavBar(false));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-primaryDark text-white px-8 py-2 drop-shadow-lg">
        {/* Logo */}
        <h1 className="text-2xl">
          <a href="/">CapableCareers</a>
        </h1>

        {/*  Navigation Bar Buttons */}
        <button
          className="lg:hidden cursor-pointer border border-transparent duration-200 hover:border-gray-300 p-2 rounded-md"
          onClick={handleNavBtn}
          onMouseLeave={() => dispatch(closeNavBar(false))}
        >
          <TiThMenu className="text-2xl" />
        </button>

        {/* NavLinks */}
        <ul
          className={` absolute top-[50px] right-0 p-3 pt-2 gap-2 ${
            isSmallScreen ? (navBarState ? "flex" : "hidden") : "flex"
          } w-32 flex-col bg-primaryDark text-teal-50 h-fit rounded-md lg:w-auto lg:relative lg:top-0 lg:p-0 lg:flex-row lg:justify-center lg:items-center lg:space-x-5 text-md md:text-lg duration-200`}
        >
          <Link to={"/"}>
            <li className=" hover:text-primaryText duration-300 cursor-pointer">
              Home
            </li>
          </Link>
          <li
            className=" hover:text-primaryText duration-300 cursor-pointer"
            onClick={() => dispatch(toggleAboutButton())}
          >
            About Us
          </li>
          <Link to={"/employerdash/dashboard"}>
            <li className=" hover:text-primaryText duration-300 cursor-pointer">
              Employer
            </li>
          </Link>
          <Link to={"/jobSeeker/dashboard"}>
            <li className=" hover:text-primaryText duration-300 cursor-pointer">
              Job Seeker
            </li>
          </Link>
          <Link to={"/jobs"}>
            <li className=" hover:text-primaryText duration-300 cursor-pointer">
              Jobs
            </li>
          </Link>
          <li className=" hover:text-primaryText duration-300 cursor-pointer">
            <a href="#contactForm">Contact Us</a>
          </li>
          <li>
            <button
              className="border py-1 lg:py-[5px] px-2 rounded-md bg-slate-200 text-slate-900 drop-shadow-sm hover:bg-secondary hover:text-white duration-300 hover:border-transparent"
              onClick={() => dispatch(toggleRegisterBtn())}
            >
              Register
            </button>
          </li>
          {isUser ? <SignOut /> : <SignIn />}
        </ul>
      </div>
    </>
  );
};
export default Navbar;
