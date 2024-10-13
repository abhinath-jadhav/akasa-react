import React from "react";
import fastfood from "../assets/fastfood.jpg";
import { Link } from "react-router-dom";

const HeroCard = ({ img, title }) => {
  const handleClick = () => {};

  return (
    <Link to={"/auth/menu"}>
      <div
        // onClick={handleClick}
        className="flex flex-col justify-between items-center bg-primery w-24 md:gap-2 md:w-48 px-2 py-2 md:px-4 md:py-4 rounded-md"
      >
        <img className="rounded-lg p-1 bg-gray-50" src={img} alt={title} />
        <h3 className="text-md font-semibold md:text-xl md:font-normal text-secondary">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default HeroCard;
