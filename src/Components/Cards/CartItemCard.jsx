/* eslint-disable react/prop-types */
import { useState } from "react";
import { GrSquare } from "react-icons/gr";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addAll,
  reduceQuantity,
  setQauntity,
} from "../../Store/Feature/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CartApi } from "../../utils/index.js";
import { addInTotal, reduceFromTotal } from "../../Store/Feature/toPay.js";
import { useNavigate } from "react-router-dom";
const CartItemCard = ({ price, qty, name, diet, id, inventory }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartItems);
  const [quantity, setQuantity] = useState(qty);
  const [show, setShow] = useState(true);
  const nav = useNavigate();

  const handleReduce = async () => {
    if (quantity > 1) {
      dispatch(reduceQuantity(id));
      const res = await CartApi.reduceFromCart(id);
      setQuantity(res.quantity);
      dispatch(reduceFromTotal(price));
      dispatch(setQauntity({ item: id, qty: quantity }));
    } else {
      Swal.fire({
        title: "Item Removed",
        text: "Minimum 1 quantity is Item removed.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      const filered = items.filter((i) => i.item != id);
      dispatch(reduceFromTotal(price));
      dispatch(addAll(filered));

      await CartApi.reduceFromCart(id);
      setShow(false);

      nav("/cart");
    }
  };

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
          text: `Only ${inventory.stock} quantity available`,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else if (res.status == 200) {
        setQuantity(res.quantity);
        if (quantity == 0) {
          setShow(false);
        }
      }
      dispatch(addInTotal(price));
    }
  };

  return (
    <div
      className={`${
        show
          ? "w-[80%] flex justify-between items-center select-none"
          : "hidden"
      }`}
    >
      <div className={`${show ? "flex items-center gap-2" : "hidden"}`}>
        <GrSquare
          className={diet == 1 ? "text-green-600" : "text-red-600"}
          size={12}
        />
        <p>{name}</p>
      </div>

      <div className={`${show ? "flex items-center gap-3" : "hidden"} `}>
        <div
          className="h-[32px] w-[80px] border-2 flex justify-between items-center text-primery 
                 font-medium text-sm text-center px-1
              "
        >
          <div onClick={handleReduce} className=" cursor-pointer">
            <FaMinus className="pl-1 text-gray-500" size={12} />
          </div>

          <div className="max-w-[40px] flex justify-center focus:ring-4 focus:outline-none focus:ring-blue-300">
            <p className="">{quantity}</p>
          </div>
          <div onClick={handleAdd} className="cursor-pointer">
            <FaPlus className="text-green-600 pr-1" size={15} />
          </div>
        </div>
        <p className="w-[50px] text-end">
          {"₹ "} {price * quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
