/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { removeItem } from "../Store/Feature/CartSlice.js";
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartApi } from "../utils/index.js";

const FoodMenuCard = ({
  id,
  name,
  description,
  img,
  price,
  index,
  ratings,
  stock,
  qty,
}) => {
  const dispatch = useDispatch();
  const [showAddToCart, setShowAddToCart] = useState(true);
  const [disable, setDisable] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAdd = async () => {
    if (quantity > 4) {
      Swal.fire({
        title: "Limit reached",
        text: "Cannot add more then 5 quantity",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    } else {
      const res = await CartApi.addToCart(id);
      if (res.status == 400) {
        Swal.fire({
          title: "Out of stock",
          text: `Only ${quantity} quantity available`,
          icon: "warning",
          confirmButtonText: "OK",
        });
        setDisable(true);
      } else if (res.status == 200) {
        setQuantity(res.quantity);

        if (quantity >= 1) {
          setShowAddToCart(false);
        } else {
          setShowAddToCart(true);
        }
      }
    }
  };

  const handleReduce = async () => {
    const res = await CartApi.reduceFromCart(id);
    if (res.status == 200) {
      setQuantity(res.quantity);
      if (res.quantity == 0) {
        setQuantity(0);
        setShowAddToCart(true);
      }
    }

    if (quantity == 1) {
      dispatch(removeItem(id));
      setShowAddToCart(true);
      setQuantity(0);
    }
  };

  useEffect(() => {
    if (qty > 0) {
      setQuantity(qty);
      setShowAddToCart(false);
    }
    if (stock == 0) {
      setDisable(true);
    }
    if (quantity > 0) {
      setShowAddToCart(false);
    }
  }, [quantity, id, stock, qty]);

  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  const isEvenColumn = index % 2 === 0;

  const classes = isEvenRow
    ? isEvenColumn
      ? "lg:bg-primery bg-primery"
      : "lg:bg-secondary bg-secondary"
    : isEvenColumn
    ? "lg:bg-secondary bg-primery"
    : "lg:bg-primery bg-secondary";
  //console.log(classes);

  return (
    <div className="w-full h-56 md:w-auto flex flex-col justify-center items-center gap-2 md:p-2 rounded-md">
      <div
        className={`${classes} h-full text-slate-50 flex justify-between px-4 items-center w-[100%] md:min-w-[600px] max-w-sm border border-gray-200 rounded-lg shadow`}
      >
        <div className="p-4">
          <img
            className="h-[120px] w-[150px] md:h-[130px] md:w-[150px] rounded-lg"
            src={img}
            alt="product image"
          />
        </div>
        <div className="hidden font-normal md:block md:w-[40%] p-2">
          {description}
        </div>

        <div className="w-[40%] md:w-[25%] flex flex-col justify-center py-8">
          <h5 className="text-xl font-semibold tracking-tight">{name}</h5>
          <div className="items-center justify-between">
            <p className="text-sm font-bold text-slate-50 my-2">
              {"RS "}
              {price}
            </p>
            {!showAddToCart ? (
              <div
                className="h-[48px] flex justify-between text-primery bg-slate-50
                 font-medium rounded-lg text-sm text-center select-none
              "
              >
                <div
                  onClick={handleReduce}
                  className=" bg-blue-700 rounded-l-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                >
                  <p className="text-slate-50 flex h-full justify-center  items-center p-4">
                    <FaMinus className="" size={12} />
                  </p>
                </div>

                <div className="max-w-[40px] flex justify-center items-center rounded-l-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <p className="px-5 py-3 text-lg text-black">{quantity}</p>
                </div>
                <div
                  onClick={handleAdd}
                  className=" bg-blue-700 rounded-r-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                >
                  <p className="text-slate-50 flex justify-center items-center h-full w-full p-4">
                    <FaPlus className="" size={12} />
                  </p>
                </div>
              </div>
            ) : (
              <button
                disabled={disable}
                onClick={handleAdd}
                className={` 
                  ${
                    disable
                      ? "bg-gray-500 rounded-lg w-[140px]"
                      : "cursor-pointer bg-blue-700 rounded-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  }
                `}
              >
                <p className="px-5 py-3 font-bold">
                  {" "}
                  {disable ? "No stock" : "Add to cart"}
                </p>
              </button>
              // <p
              //   onClick={handleAdd}
              //   className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 md:py-3 text-center "
              // >
              //   Add to cart
              // </p>
            )}
          </div>
          <div className="flex items-center mt-2.5">
            <StarRating rating={ratings} />

            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {ratings}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenuCard;
