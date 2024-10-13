import { useEffect } from "react";
import { Container, HomeBody, HomeSlider, SubFooter } from "../Components";
import { CartApi } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addAll } from "../Store/Feature/CartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  useEffect(() => {
    const fetchCarts = async () => {
      if (!Array.isArray(cartItems) && cartItems.length == 0) {
        const data = await CartApi.getAllCarts();
        if (data != null && data.status == 200) {
          dispatch(addAll(data.list));
        } else {
          const items = localStorage.getItem("cart");
          if (items) {
            const parsed = JSON.parse(items);
            Array.isArray(parsed) &&
              parsed.length > 0 &&
              dispatch(addAll(parsed));
            console.log(parsed);
          }
        }
      }
    };

    fetchCarts();
  }, [dispatch]);

  return (
    <div className="pb-8">
      <HomeSlider />
      <Container>
        <div className="bg-white  rounded-lg my-5 flex justify-center">
          <hr />
          <div className="w-[70%] my-5">
            <h3 className="text:lg font-semibold md:text-3xl text-center">
              Café Akasa - Your culinary delight in the sky
            </h3>

            <div className="text-sm md:text-xl text-justify mt-5">
              <p>
                Discover fusion, hearty and wholesome, never seen before dishes
                in the skies with Café Akasa, Akasa Air’s onboard meal service.
                Café Akasa presents a highly evolved assortment of
                multi-cuisine, tasty and healthy meals, ensuring wide-ranging
                culinary preferences, as we uphold our ethos of serving a high
                quality, elevated flying experience to our valued customers.
              </p>
              <p className="mt-5">
                Explore a mix of gourmet meals, snacks, beverages, and
                ready-to-eat options, designed to cater to every palate. The
                menu includes a wide assortment of options comprising light
                meals and regional favourites. Akasa Air also offers a
                pre-selection of cakes on its regular menu for those who want to
                celebrate special occasions while flying.
              </p>
            </div>
          </div>
          <hr />
        </div>
      </Container>

      <HomeBody />
      <SubFooter
        desc={"Check out our all menu !!"}
        button={"Explore now"}
        to={"/auth/menu"}
      />
    </div>
  );
};

export default Home;
