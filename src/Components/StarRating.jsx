import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

// Adjust path as necessary

const StarRating = ({ rating }) => {
  // Calculate the number of full stars, half star, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  //console.log(hasHalfStar);
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar
          key={index + fullStars + (hasHalfStar ? 1 : 0)}
          className="text-slate-50"
        />
      ))}
    </div>
  );
};

export default StarRating;
