import { use, useState } from "react";
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
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toogleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
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
            console.log(error);
        }
    }

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"
                } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-5 text-white bg-[#000] w-[5%] hover:w-[15%] h-[100vh]  fixed `}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link to="/" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineHome className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
                    </div>
                </Link>

                <Link to="/shop" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShopping className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}
                    </div>
                </Link>

                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                    </div>
                </Link>

                <Link to="/favorite" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                        <FaHeart className="mt-[3rem] mr-3" size={20} />
                        <span className="hidden nav-item-name mt-[3rem]">
                            Favorites
                        </span>
                    </div>
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex item-center text-grey-8000 focus: outline-none"
                >
                    {userInfo ? (<span className="text-white">{userInfo.username}</span>) : (<></>)}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 mt-2`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
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
                        className={`absolute right-0 mt-2 mr-14 space-y-2 bg-[#171414] text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"
                            } `}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className="block px-4 py-2 hover:bg-[#292424]"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/productlist"
                                        className="block px-4 py-2 hover:bg-[#292424]"
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/categorylist"
                                        className="block px-4 py-2 hover:bg-[#292424]"
                                    >
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/orderlist"
                                        className="block px-4 py-2 hover:bg-[#292424]"
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/userlist"
                                        className="block px-4 py-2 hover:bg-[#292424]"
                                    >
                                        Users
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-[#292424]">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logoutHandler}
                                className="block w-full px-4 py-2 text-left hover:bg-[#292424]"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                    <li>
                        <Link to="/login" className="flex relative">
                            <div className="flex items-center transition-transform transform hover:translate-x-2">
                                <AiOutlineLogin className="mt-[3rem] mr-3" size={26} />
                                <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="flex relative">
                            <div className="flex items-center transition-transform transform hover:translate-x-2">
                                <AiOutlineUserAdd className="mt-[3rem] mr-3" size={26} />
                                <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
                            </div>
                        </Link>
                    </li>
                </ul>
            )}


        </div>
    );
};

export default Navigation;