import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { clearFavourites } from "../../redux/features/favorites/favoriteSlice";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [showSidebar, setShowSidebar] = useState(false);
    const showSidebar = false;

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(clearCartItems());
            dispatch(clearFavourites());
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"
                } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-5 text-white backdrop-blur-lg  shadow-2xl bg-gradient-to-tl from-[#0c0c3f]/30  via-[#3a0d3c]/30 to-[#c4184e]/30 w-[5%] hover:w-[15%] h-[100vh]  fixed `}
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
                    <div className="flex items-center transition-transform transform hover:translate-x-2 ">
                        <AiOutlineShopping className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}
                    </div>
                </Link>

                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-3" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                        <div className="absolute top-7 left-4">
                            {cartItems.length > 0 && (
                                <span>
                                    <span className="px-1 py-0 text-sm text-white bg-cyan-700 rounded-full">
                                        {cartItems.reduce((a, c) => parseInt(a + c.qty * 1), 0)}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>

                </Link>

                <Link to="/favorites" className="flex relative">
                    <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
                        <FaHeart className="mt-[3rem] mr-3" size={20} />
                        <span className="hidden nav-item-name mt-[3rem]">
                            Favourites
                        </span>
                        <FavoritesCount />
                    </div>
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex item-center text-grey-800 focus: outline-none"
                >
                    {userInfo ? (
                        <div className="flex items-center py-2 transition-transform transform active:backdrop-blur-md active:bg-white/10 active:shadow-lg hover:translate-x-2 rounded-lg">
                            <CgProfile className=" mr-3" size={26} />
                            <span className="hidden nav-item-name mr">{userInfo.username}</span>{" "}

                            {/* <span className="text-white">{userInfo.username}</span> */}
                        </div>) : (<></>)}
                    {/* {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-3 mt-14`}
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
                    )} */}
                </button>

                {dropdownOpen && userInfo && (
                    <ul
                        className={`absolute p-2 right-0 mt-2 mr-14 space-y-2 bg-transparent border border-white/20 ${!userInfo.isAdmin ? "-top-30" : "-top-90"
                            } `}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/addproduct"
                                        className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/categorylist"
                                        className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
                                    >
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/orderlist"
                                        className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/userlist"
                                        className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
                                    >
                                        Users
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 ">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logoutHandler}
                                className="block w-full px-4 py-2 text-left hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 "
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