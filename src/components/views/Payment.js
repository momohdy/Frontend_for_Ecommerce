import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/shoppingCartsActions";
import  CheckoutSteps  from "./CheckoutSteps";


function App() {
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    console.log("paymentMethod", paymentMethod);
    window.location.href = "/placeOrder";
  };

  return (
    <Container>
    
    <Row className="justify-content-center">
    <Col md={6}>
    <CheckoutSteps step1 step2 step3 />
          <h2 className="mb-3 mt-3">Payment Details</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label className="mb-3 mt-3">Select Payment Method:</Form.Label>
              <Form.Check
                type="radio"
                name="paymentMethod"
                label="Credit Card"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
              />
              <Form.Check
                type="radio"
                name="paymentMethod"
                label="PayPal"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3 mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
