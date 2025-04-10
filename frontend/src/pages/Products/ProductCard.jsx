import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
        toast.success("Item added to cart");
    };

    return (
        <div className="flex text-white justify-between max-w-sm relative border border-white/20 rounded shaodw bg-gray-800/50 h-[200px] w-[500px]">
            <section className="relative mr-0">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-cyan-100 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full"
                        src={p.image}
                        alt={p.name}
                        style={{ height: "200px", width: "400px", objectFit: "cover", borderRadius: "5px" }}
                    />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-5 w-full h-full flex flex-col">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-white dark:text-white">{p?.name?.substring(0, 15)}</h5>

                    <p className="  font-semibold text-cyan-500 rounded-2xl">
                        {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                </div>

                <p className="mb-3 font-normal text-[#CFCFCF] text-sm">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex justify-between">
                    <Link
                        to={`/product/${p._id}`}
                        className="absolute bottom-2 items-center px-3 py-2 text-sm font-medium text-center text-white transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 rounded-md focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                    >
                        Read More
                        <svg
                            className="w-3.5 h-3.5 ml-2 inline-block"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>

                    <button
                        className="absolute bottom-2 right-2 p-2 rounded-full"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShoppingCart size={25} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;