import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInformation } from "../../actions/shoppingCartsActions";
import  CheckoutSteps  from "./CheckoutSteps";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shoppingCarts);
  const { shippingInformation } = cart;

  const [address, setAddress] = useState(shippingInformation.address);
  const [city, setCity] = useState(shippingInformation.city);
  const [postalCode, setPostalCode] = useState(shippingInformation.postalCode);
  const [country, setCountry] = useState(shippingInformation.country);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCountyCodeChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInformation({ address, city, postalCode, country }));
    console.log("Shipping information:", address, city, postalCode, country);
    window.location.href = "/payment";
    // Reset form fields
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <CheckoutSteps step1 step2 />
      <div>
        <h2 className="mb-3 mt-3">Shipping Information</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={handleCityChange}
            />
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={handleCountyCodeChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3 mt-3">
            Proceed to Payment
          </Button>
        </Form>
      </div>
    </MDBContainer>
  );
}

export default App;
