import Arrow from "../assets/arrow.svg";
import Profile from "../assets/profile.svg";
import Search_icon from "../assets/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "./Container";
import { FaCartArrowDown, FaHome } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo1.png";
import { CartApi } from "../utils";
import { addAll } from "../Store/Feature/CartSlice";
import { setAuth } from "../Store/Feature/authSlice";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const [isAuth, setAuth] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/search-result");
    }
  };

  const dropdownRef = useRef(null);

  // Function to handle clicks outside of the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      let sessionID = localStorage.getItem("session-id");
      if (!sessionID) {
        sessionID = uuidv4();
        localStorage.setItem("session-id", sessionID);
      }
    } else {
      dispatch(setAuth(true));
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleLogin = (event) => {
      if (event.key === "token") {
        if (event.newValue) {
          dispatch(setAuth(true));
          navigate("/");
        } else {
          dispatch(setAuth(false));
          navigate("/login");
        }
      }
    };
    window.addEventListener("storage", handleLogin);
    return () => {
      window.removeEventListener("storage", handleLogin);
    };
  }, []);

  useEffect(() => {
    const fetchCarts = async () => {
      const data = await CartApi.getAllCarts();
      if (data != null && data.status == 200) {
        dispatch(addAll(data.list));
      } else {
        const items = localStorage.getItem("cart");
        if (items) {
          const parsed = JSON.parse(items);
          Array.isArray(parsed) &&
            parsed.length > 0 &&
            dispatch(addAll(parsed));
          console.log(parsed);
        }
      }
    };

    fetchCarts();
  }, [dispatch]);

  const logout = () => {
    const saveUserCart = () => {
      dispatch(setAuth(false));
      localStorage.removeItem("token");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("cart");
    };

    saveUserCart();

    navigate("/");
  };

  return (
    <div className="bg-primery">
      <Container>
        <div className="flex w-full items-center px-4 py-1 h-[66px] md:gap-8 ">
          <div className="flex w-[30%] md:w-[70%] gap-4 md:gap-12 items-center">
            <div>
              <Link to={"/"}>
                {/* <Logo size={50} className="text-slate-50" /> */}
                <img className="h-[45px] md:h-[60px]" src={logo} alt="" />
              </Link>
            </div>
            {/* Search */}
            <div className="hidden w-[70%] relative bg-slate-100 rounded-md p-2">
              <img
                className="absolute h-6 w-6 top-2 left-1"
                src={Search_icon}
                alt="search"
              />
              <input
                className="pl-8 w-full bg-transparent outline-none"
                type="text"
                placeholder="Search for Products, Brands and More"
                onKeyDown={(event) => handleSearch(event)}
              />
            </div>
          </div>
          <div className="w-[70%] flex items-center justify-between md:w-[40%] text-lg">
            <Link to={"/"}>
              <div className="flex items-center justify-center font-semibold gap-2 text-secondary">
                <FaHome size={30} />
                <h3 className="hidden md:block">Home</h3>
              </div>
            </Link>
            <Link to={"/menu"}>
              <div className="flex items-center justify-center font-semibold gap-2 text-secondary">
                <MdFastfood size={30} />
                <h3 className="hidden md:block">Menu</h3>
              </div>
            </Link>

            {/* Cart */}
            <Link to={"/cart"} className="flex gap-2 relative text-secondary">
              {/* {cartItems.length !== 0 && (
                <div className="absolute flex justify-center items-center text-xs top-[-0.3rem] left-2 bg-orange-600  h-[16px] w-[16px] rounded-full">
                  <p>{cartItems[0].quantity}</p>
                </div>
              )} */}
              <div className="flex items-center justify-center gap-2 font-semibold text-lg">
                <FaCartArrowDown size={30} />
                <h3 className="hidden md:block">Cart</h3>
              </div>
            </Link>

            {/* Profile */}
            <div
              ref={dropdownRef}
              onClick={() => setIsVisible(isAuth ? !isVisible : false)}
              className="flex gap-3 group cursor-pointer relative hover:border-2 border-secondary p-2 rounded-md"
            >
              {isAuth ? (
                <div className="flex items-center justify-center gap-2 text-secondary">
                  <CgProfile size={30} />
                  <h3 className="font-semibold text-lg hidden md:block">
                    Profile
                  </h3>
                  <img
                    src={Arrow}
                    alt="arrow"
                    className="group-hover:rotate-180 duration-500 mt-1 hidden md:block"
                  />
                </div>
              ) : (
                <Link to={"/login"}>
                  <div className="flex items-center justify-center gap-2 text-secondary">
                    <CgProfile size={30} />
                    <h3 className="font-semibold text-lg hidden md:block">
                      Login
                    </h3>
                    <img
                      src={Arrow}
                      alt="arrow"
                      className="group-hover:rotate-180 duration-500 mt-1 hidden md:block"
                    />
                  </div>
                </Link>
              )}
              {/* Drop Down Menu */}
              <div
                className={`${
                  isAuth && isVisible ? "block" : "hidden"
                } w-screen md:w-[150px] absolute top-[56px] right-[-18px] md:left-0 p-4 text-sm border rounded-md shadow-md bg-white`}
              >
                <div className="flex flex-col gap-5 items-end">
                  {/* <Link to={}>
                    <div className="flex w-auto gap-2 items-center">
                      <img className="h-[20px]" src={Profile} alt="" />
                      <h4>My Profile</h4>
                    </div>
                  </Link> */}
                  <Link to={"/auth/orders"}>
                    <div className="flex gap-2 items-center">
                      <img className="h-[20px]" src={Profile} alt="" />
                      <h4>Orders</h4>
                    </div>
                  </Link>
                  <div className="flex gap-2 items-center" onClick={logout}>
                    <img className="h-[20px]" src={Profile} alt="" />
                    <h4>Logout</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
