/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addAll,
  addItem,
  reduceQuantity,
} from "../../Store/Feature/CartSlice.js";
import Swal from "sweetalert2";
import { CartApi } from "../../utils/index.js";
import { addCartDetails } from "../../Store/Feature/Cartdetails.js";
import { useNavigate } from "react-router-dom";

const ChangeQuantity = ({ id, qty, inventory, price }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cartItems);
  const nav = useNavigate();
  const [quantity, setQuantity] = useState(qty);
  const [show, setShow] = useState(true);

  const handleReduce = async () => {
    if (quantity > 1) {
      dispatch(reduceQuantity(id));
      const res = await CartApi.reduceFromCart(id);

      dispatch(addCartDetails(res.items));
    } else {
      Swal.fire({
        title: "Item Removed",
        text: "Minimum 1 quantity is Item removed.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      const filered = items.filter((i) => i.item != id);

      dispatch(addAll(filered));

      const res = await CartApi.reduceFromCart(id);
      if (res.status == 500) {
        dispatch(addCartDetails([]));
        nav("/auth/emptycart");
      } else {
        dispatch(addCartDetails(res.items));
      }
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
      if (auth) {
        const res = await CartApi.addToCart(id);
        if (res.status == 400) {
          Swal.fire({
            title: "Out of stock",
            text: `Only ${inventory.stock} quantity available`,
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else if (res.status == 200) {
          setQuantity(res.item.qty);
          if (quantity == 0) {
            setShow(false);
          }
        }
      } else {
        dispatch(addItem(id));
      }
    }
  };
  return <></>;
};

export default ChangeQuantity;
