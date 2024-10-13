/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUser } from "../utils";
import FlightCard from "./Cards/FlightCard";
import TextRadioButton from "./Buttons/CustomRadioButton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCheckOutDetails } from "../Store/Feature/checkOutSlice";

const CartUserDetails = ({ flights }) => {
  const [user, setUser] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);
  const handleClick = (flightId) => {
    dispatch(updateCheckOutDetails({ flightId: flightId, type: "FLIGHT" }));
  };

  return (
    <>
      {auth ? (
        <div className="w-[80%]">
          <div>
            <p className="text-2xl">Contact details</p>
            <div className="flex mt-5">
              <p className="font-semibold">Email Id : </p>
              <p className="ml-2"> {user}</p>
            </div>

            <div className="flex">
              <p className="font-semibold">Phone Number: </p>
              <p className="ml-2"> ******9865 </p>
            </div>
          </div>
          <div className="border w-[100%] border-black my-5 "></div>
          <div className="w-full">
            <p className="text-2xl mb-5">Select your upcoming flight</p>
            <div className="flex flex-col gap-4">
              {flights.map((f) => (
                <div key={f.id} className="">
                  <FlightCard {...f} handleClick={handleClick} />
                </div>
              ))}
            </div>
          </div>
          <div className="border w-[100%] border-black my-5"></div>
          <div>
            <h3 className="text-2xl mb-5">Select Payment</h3>
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center">
                <TextRadioButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center gap-4 h-[200px]">
          <p className="text-md text-center">
            Please login/register to complete your order
          </p>
          <div className="flex gap-4">
            <Link
              to={"/register"}
              className="bg-secondary rounded-lg px-4 py-2 text-slate-50 text-lg font-medium
              hover:bg-slate-50 hover:text-secondary border-2 border-secondary"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              className="bg-secondary rounded-lg px-4 py-2 text-slate-50 text-lg font-medium
              hover:bg-slate-50 hover:text-secondary border-2 border-secondary"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartUserDetails;
