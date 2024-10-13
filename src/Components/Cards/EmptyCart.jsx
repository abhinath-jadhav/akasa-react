import React from "react";
import Container from "../Container";
import { PiSealWarningFill } from "react-icons/pi";
import SubFooter from "../SubFooter";

const EmptyCart = () => {
  return (
    <div>
      <div className="h-[70vh] flex items-center">
        <Container>
          <div className="flex flex-col items-center gap-3">
            <PiSealWarningFill size={300} className="text-orange-400" />
            <h3 className="text-4xl font-semibold">Empty Cart</h3>
            <h3 className="text-2xl">Please add some items in cart</h3>
          </div>
        </Container>
      </div>

      <SubFooter
        button={"All Menu"}
        desc={"Checkout our dellicious menu ??"}
        to={"/menu"}
      />
    </div>
  );
};

export default EmptyCart;
