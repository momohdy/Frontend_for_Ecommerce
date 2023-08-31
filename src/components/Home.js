import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Product from "./Product";
import { listProducts } from "../actions/productActions";

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts);
  }, [dispatch]);

  return (
    <div className="text-center py-3">
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : loading ? (
        <Alert variant="info">Loading....</Alert>
      ) : (
        <Row>
          {products.map((prod) => {
            return (
              <Col sm={12} md={6} lg={3} xl={4} key={prod._id}>
                <Product singleProd={prod} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
