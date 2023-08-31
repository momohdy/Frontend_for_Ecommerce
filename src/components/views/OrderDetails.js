import React, { useEffect, useState } from "react";
import {  PayPalButton } from 'react-paypal-button-v2';
import Alert from "react-bootstrap/Alert";
import { Container, Row, Col } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderDeatailsAction,
  payUbdateAction,
} from "../../actions/orderActions";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  // SdkReady for paypal js
  const [sdkReady, setSdkReady] = useState(false);

  // order summary content ->
  let products = 0;
  let shipping = 0;
  const [tax, setTax] = useState(0);
  useEffect(() => {
    setTax(Number(products * 0.15));
  }, [products]);
  // <-

  const { id } = useParams();
  const getOrder = useSelector((state) => state.getOrderDeatils);
  const { order, loading, error } = getOrder;

  // payUbdate
  const payUbdate = useSelector((state) => state.payUbdate);
  const { loading: loadingPay, success: succeessPay } = payUbdate;

  // successPaymentHandler

  useEffect(() => {
    const addPayPalScript = async () => {
      const client = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${client.data}`;
      //  we remove &components=YOUR_COMPONENTS
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || succeessPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDeatailsAction(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        // run the SDK js
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, id, dispatch, succeessPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payUbdateAction(id, paymentResult));
  };

  return error ? (
    <Alert variant="danger">{error}</Alert>
  ) : loading ? (
    <Alert variant="info">Loading....</Alert>
  ) : (
    <Container>
      <Row>
      <h2>ORDER {order._id} </h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Col md={8}>
          <h2 className="mb-3 mt-3">SHIPPING </h2>

          <h6>
            Name : {order.user.name} <hr /> Email : {order.user.email} <hr />
            Address : {order.shippingInformation.address}
          </h6>

          <hr className="my-2" />
          {order.isDelivered ? (
            <Alert variant="succeess">{order.deliveredAt}</Alert>
          ) : (
            <Alert variant="danger">Not Delivered</Alert>
          )}
          <h2 className="mb-3 mt-3">PAYMENT METHOD</h2>

          <h6> Method : {order.paymentMethod}</h6>
          <hr className="my-2" />
          {order.isPaid ? (
            <Alert variant="success">Paid At : {order.paidAt}</Alert>
          ) : (
            <Alert variant="danger">Not Paid</Alert>
          )}
          <h2 className="mb-3 mt-3">ORDER ITEMS</h2>

          {order.orderItems.map((item, index) => {
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

                {!order.isPaid && (
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {loadingPay || !sdkReady ? (
                      <Alert variant="info">Loading....</Alert>
                    ) : (
                      <PayPalButton
                        amount={(products + tax + shipping).toFixed(2)}
                        onClick={() => console.log("Payment Successful!")}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </MDBListGroupItem>
                )}
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
