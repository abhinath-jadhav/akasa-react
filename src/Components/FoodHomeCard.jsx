/* eslint-disable react/prop-types */
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

const FoodHomeCard = ({ name, description, img, price, ratings }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-2 rounded-md">
      <div className="flex justify-between px-4 items-center w-[100%] md:min-w-[600px] max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="w-[50%] md:w-[30%] p-4">
          <img
            className="h-[130px] w-[150px] rounded-lg"
            src={img}
            alt="product image"
          />
        </div>
        <div className="hidden font-normal md:block md:w-[40%] p-8">
          {description}
        </div>

        <div className=" w-[40%] md:w-[30%] flex flex-col justify-center py-8 gap-2">
          <h5 className="text-xl font-semibold tracking-tight">{name}</h5>
          <div className="flex flex-col justify-between">
            <p className="text-sm font-bold text-gray-900 my-2">
              {"RS "}
              {price}
            </p>
            <Link to={"/menu"}>
              <p className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center ">
                Explore
              </p>
            </Link>
          </div>
          <div className="flex items-center mt-4">
            <StarRating rating={ratings} />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {ratings}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodHomeCard;
