import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="flex justify-between items-center p-4 text-black bg-gray-200 w-full h-[60px] fixed top-0 left-0 "
      id="navigation-container" 
    >
        <div className="flex justify-between items-center ms-10">
        <i className="fa-solid fa-truck ms-8 cursor-pointer text-xl text-orange-600"></i>
        <h1 className="text-2xl font-bold ms-3">Orderly</h1>
      </div>
      <div className="flex space-x-6">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-y-2  hover:text-orange-500"
        >
          <AiOutlineHome size={26} />
          <span className="hidden nav-item-name "></span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500"
        >
          <AiOutlineShopping size={26} />
          <span className="hidden nav-item-name"></span>{" "}
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-y-2 hover:text-orange-500">
            <AiOutlineShoppingCart size={26} />
            <span className="hidden nav-item-name"></span>{" "}
          </div>

          <div className="absolute -top-2 -right-2">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-orange-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-y-2 hover:text-orange-500">
            <FaHeart size={20} />
            <span className="hidden nav-item-name"></span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-black font-bold">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 space-y-2 bg-gray-200 text-black ${
              !userInfo.isAdmin ? "top-12" : "top-8"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/allproductslist"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-orange-500"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-orange-500">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-orange-500"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-y-2"
              >
                <AiOutlineLogin size={26} />
                <span className="hidden nav-item-name"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-y-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name"></span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
