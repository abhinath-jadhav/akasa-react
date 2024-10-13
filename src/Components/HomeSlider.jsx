import React, { useEffect, useState } from "react";
import Container from "./Container";
import HeroCard from "./HeroCard";
import fastfood from "../assets/fastfood.jpg";
import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpeg";
import sandwich from "../assets/sandwich.jpg";
import rice from "../assets/rice.jpg";
import table from "../assets/table.jpg";
import logo from "../assets/logo.svg";
import fruit from "../assets/fruit.png";
import { FoodApi } from "../utils";

const HomeSlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await FoodApi.fetchFoodData("/food/categories");

      if (data.status == 200) {
        const cats = data.items;
        setCategories(cats);
        setLoading(false);
        //console.log(categories);
      }
    };

    //fetchCategories();
  });
  return (
    <div className="">
      <Container>
        <div className="md:mt-8">
          <div className="bg-white flex flex-col md:flex-row justify-between items-center md:rounded-xl py-4 md:px-4">
            <div className="md:w-[30%] px-4 flex md:flex-col gap-4">
              <div className="ml-5">
                <p className="md:text-4xl font-semibold">Café Akasa </p>
                <p className="md:text-lg">by</p>
              </div>
              <img className="w-32 md:w-72" src={logo} alt="" />
            </div>
            <img
              className="mx-4 md:mx-0 h-28 md:h-72 rounded-md md:rounded-xl"
              src={table}
              alt=""
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 my-10">
            <HeroCard img={fastfood} title="Fastfood" />
            <HeroCard img={fruit} title="Fruits" />
            <HeroCard img={rice} title="Rice" />
            <HeroCard img={pizza} title="Pizza" />
            <HeroCard img={burger} title="Burger" />
            <HeroCard img={sandwich} title="Sandwich" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeSlider;
