import React, { useEffect, useState } from "react";
import { UserApi } from "../utils";
import { Container, Loading, SubFooter } from "../Components";
import { PiSealWarningFill } from "react-icons/pi";

const Order = () => {
  const [orderlist, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await UserApi.getAllOrders();
      //console.log(res);

      if (res.status == 200) {
        setOrders(res.orders);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <div className="py-10">
      {orderlist ? (
        <>
          <Container>
            <div className="min-h-[60vh] md:w-[80%]">
              <h3 className="text-4xl text-center font-semibold">Order list</h3>
              <div className="md:py-5 md:w-full text-md">
                <div
                  className={`bg-slate-50 w-full hidden font-semibold md:flex flex-col md:flex-row justify-between text-center border-2 md:px-4 md:py-8 mt-5`}
                >
                  <p className="md:w-[220px] text-sm">ID</p>

                  <p className="md:w-[300px] text-sm">Order ID</p>

                  <p className="md:w-[100px] text-sm">Amount Paid</p>

                  <p className="text-sm">Odrer Status</p>
                </div>
                {orderlist.map((order, i) => (
                  <div
                    key={i}
                    className={`p-4 bg-slate-50 text-sm md:min-w-[600px] flex gap-3 flex-col md:flex-row justify-between text-center border-2 md:px-4 md:py-8 mt-5  ${
                      i % 2 == 0 ? "" : ""
                    }`}
                  >
                    <p className="font-semibold md:hidden">Order {i + 1}</p>
                    <p className="md:w-[220px] ">{order.id}</p>

                    <p className="md:w-[300px]">{order.orderId}</p>
                    <p className="md:w-[100px]">₹ {order.payment}</p>
                    <p className="font-semibold">{order.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
          <SubFooter
            button={"All Menu"}
            desc={"Checkout our dellicious menu ??"}
            to={"/menu"}
          />
        </>
      ) : (
        <>
          <div>
            <div className="h-[70vh] flex items-center">
              <Container>
                <div className="flex flex-col items-center gap-3">
                  <PiSealWarningFill size={300} className="text-orange-400" />
                  <h3 className="text-4xl font-semibold">Empty orderlist</h3>
                </div>
              </Container>
            </div>

            <SubFooter
              button={"All Menu"}
              desc={"Checkout our dellicious menu ??"}
              to={"/auth/menu"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
