import React from "react";

export default function Rating({ rating, reviews ,color }) {
  return (
    <div>
      <span>
        <i
        style={{color}}
          className={
            rating >= 4 ? "fa fa-solid fa-star" : "fa fa-solid fa-star-half"
          }
        ></i>
      </span>
      <span>{reviews.rating}</span>
    </div>
  );
}
