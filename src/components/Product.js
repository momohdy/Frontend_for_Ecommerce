import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ singleProd }) {
  const SP = singleProd;

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Link
          to={{ pathname: `/product/${singleProd._id}` }}
          state={SP}
        >
          <Card.Img src={singleProd.image} variant="top" alt="suii" />
        </Link>

        <Card.Body>
          <Card.Title>{singleProd.name}</Card.Title>
          <Card.Text>{singleProd.description}</Card.Text>

          <Rating
            rating={singleProd.rating}
            reviews={singleProd.reviews}
            color={"red"}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
