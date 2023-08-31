import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import CheckoutSteps from "./CheckoutSteps";
import { createOrderAction } from "../../actions/orderActions";
// Note , you might nedd to write .js for orderActions

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shoppingCarts);
  const { shippingInformation } = cart;
  const { paymentMethod } = cart;
  const { cartItems } = cart;

  // create with array.reduce func
  let products = 0;
  let shipping = 0;
  const [tax, setTax] = useState(0);
  useEffect(() => {
    setTax(Number(products * 0.15));
  }, [products]);

  const createOrder = useSelector((state) => state.createOrder);
  const { order, success, error } = createOrder;


  

  useEffect(() => {
    if (success) {
      console.log(order._id);

      window.location.href = `/orders/${order._id}`;
    }
  }, [success, order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrderAction({
        orderItems: cartItems,
        shippingInformation: shippingInformation,
        paymentMethod: paymentMethod,
        itemsPrice: products,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: Number(products) + Number(shipping) + Number(tax),
      })
    );
  };

  return (
    <Container>
      <Row>
        {error && <Alert variant="danger">{error}</Alert>}
        <CheckoutSteps step1 step2 step3 step4 />

        <Col md={8}>
          <h2 className="mb-3 mt-3">SHIPPING DETAILS</h2>

          <h6>
            {shippingInformation.country} , {shippingInformation.city} ,{" "}
            {shippingInformation.address}
          </h6>
          <hr className="my-2" />
          <h2 className="mb-3 mt-3">PAYMENT METHOD</h2>

          <h6>{paymentMethod}</h6>
          <hr className="my-2" />
          <h2 className="mb-3 mt-3">ORDER ITEMS</h2>

          {cartItems.map((item, index) => {
            products = products + item.price * item.quantity;
            return (
              <MDBCard className="mb-3" key={index}>
                <MDBCardBody>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <MDBCardImage
                          src={item.image}
                          fluid
                          className="rounded-3"
                          style={{ width: "30px" }}
                          alt="Shopping item"
                        />
                      </div>

                      <div className="ms-3">
                        <MDBTypography tag="h5">{item.name}</MDBTypography>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <div style={{ width: "80px" }}>
                        <MDBTypography tag="h6" className="mb-0">
                          {item.quantity} x {item.price} $
                          {item.price * item.quantity}
                        </MDBTypography>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            );
          })}
          <hr className="my-2" />
        </Col>

        <Col md={4}>
          <MDBCard className="mb-4">
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                ORDER SUMMARY
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>${products.toFixed(2)}</span>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Shipping
                  <span>${shipping.toFixed(2)}</span>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Tax
                  <span>${tax.toFixed(2)}</span>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Total
                  <span>${(products + tax + shipping).toFixed(2)}</span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>

          <Button
            variant="primary"
            type="submit"
            className="mb-3 mt-3 w-100"
            onClick={handleSubmit}
          >
            PLACE ORDER
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
