import { useEffect, useState } from "react";
import { CartApi, InventoryApi, UserApi } from "../utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CartItemCard,
  CartUserDetails,
  Container,
  EmptyCart,
  Loading,
  SubFooter,
} from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { addAll } from "../Store/Feature/CartSlice";
import { addCartDetails } from "../Store/Feature/Cartdetails";
import { resetToPay } from "../Store/Feature/toPay";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const toPay = useSelector((state) => state.toPay);
  const checkoutDetails = useSelector((state) => state.checkOutDetails);
  const [inventoryMap, setInventoryMap] = useState({});
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchInventory = async () => {
        const data = await InventoryApi.getAllInventories();
        if (data.status == 200) {
          const inventoryMap = {};
          data.inventories.forEach((item) => {
            inventoryMap[item.itemId] = item;
          });

          setInventoryMap(inventoryMap);
        }
      };

      await fetchInventory();

      const fetchCartDetails = async () => {
        const data = await CartApi.getAllCarts();

        if (data.status == 200) {
          dispatch(addCartDetails(data.cart));

          if (toPay == 0 || Number.isNaN(toPay)) {
            const pay = data.cart.reduce((sum, i) => {
              return i.qty * i.price + sum;
            }, 0);
            dispatch(resetToPay(pay));
          }
          setCartList(data.cart);
        }
      };

      await fetchCartDetails();
    };

    fetchData();

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchFlight = async () => {
      const data = await UserApi.getFlightDetails();
      if (data.status == 200) {
        setFlights(data.flights);
      }
    };
    if (auth) fetchFlight();
  }, [auth]);

  useEffect(() => {
    if (checkoutDetails.flight == true && checkoutDetails.mode == true) {
      setShowPayment(true);
    }
  }, [checkoutDetails]);

  const handlePayment = async () => {
    if (!auth) {
      Swal.fire({
        title: "Authentication Required",
        text: "Log in to proceed.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else if (!showPayment) {
      Swal.fire({
        title: "Details Required",
        text: "Select mode of payment and flight.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      //console.log(cartList);
      const data = {
        payment: toPay,
        flight: checkoutDetails.flightId,
        paymentMode: checkoutDetails.modeType,
      };
      //console.log(data);
      const res = await CartApi.completeOrder(data);
      if (res.status == 200) {
        dispatch(addAll([]));
        localStorage.removeItem("cart");
        navigate("/auth/payment", { state: { res } });
      } else {
        Swal.fire({
          title: "Error",
          text: res.message,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <>
      {cartList && cartList.length > 0 ? (
        <div className="pt-4 ">
          <Container>
            <div className="w-[80%]">
              <h3 className="text-3xl">Secure checkout</h3>
              {/* <hr className="w-full mt-5 border-t shadow-hr-dark" /> */}

              <div className="w-full lg:flex justify-between mt-5">
                <div className="md:w-[55%] h-fit bg-white flex justify-center py-5">
                  <CartUserDetails
                    handlePayment={handlePayment}
                    flights={flights}
                  />
                </div>
                <div className="md:hidden border w-[100%] border-black my-10 shadow-hr-dark"></div>
                <div className="md:mt-0 md:w-[35%] h-fit pb-8 bg-white text-sm flex flex-col items-center">
                  <h3 className="text-2xl my-5">Price Breakup</h3>
                  <div className="border w-[85%] border-black"></div>
                  {/* <hr className="w-full mt-2 border-t shadow-hr-dark" /> */}
                  <div className="pt-8 flex flex-col gap-5 items-center justify-center w-full">
                    {cartList?.map((cart, i) => (
                      <CartItemCard
                        key={i}
                        {...cart}
                        inventory={inventoryMap[cart.id]}
                      />
                    ))}
                    <div className="border w-[85%] border-black"></div>
                  </div>

                  <div className="mt-5 w-[80%] flex  items-center justify-between">
                    <p className="text-2xl">To pay</p>
                    <p className="text-2xl">
                      {"₹ "} {toPay}
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="flex justify-center mt-10">
                      <button
                        onClick={handlePayment}
                        // disabled={!showPayment || !auth}
                        className={`${
                          auth && showPayment
                            ? "text-3xl border p-6 bg-green-700 text-white"
                            : "text-3xl border p-6 bg-gray-500 text-white"
                        }`}
                      >
                        Complete Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container
            className={"justify-start items-start w-[50%]"}
          ></Container>

          <SubFooter
            desc={"Add few more items from our delicious menu !!"}
            button={"Explore now"}
            to={"/auth/menu"}
          />
        </div>
      ) : (
        <div>
          <EmptyCart />
        </div>
      )}
    </>
  );
};

export default Cart;
