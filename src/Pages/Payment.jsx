import React from "react";
import { useLocation } from "react-router-dom";
import { Container, SubFooter } from "../Components";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Payment = () => {
  const location = useLocation();
  const { res } = location.state || {}; // Retrieve data from state

  return (
    <>
      <div className="h-[70vh] flex items-center">
        <Container>
          <div className="">
            <div className="flex justify-center">
              <IoCheckmarkDoneCircle className="text-green-600" size={150} />
            </div>
            <div className="flex flex-col gap-3 items-center">
              <h3 className="text-3xl font-semibold">
                Order Succssfully placed
              </h3>
              <p className="text-xl">Thank you for your order ! </p>
              <p>Order ID: {res.orderId}</p>
            </div>
          </div>
        </Container>
      </div>
      <SubFooter
        button={"All Menu"}
        desc={"Want to try another dishes ??"}
        to={"/auth/menu"}
      />
    </>
  );
};

export default Payment;
