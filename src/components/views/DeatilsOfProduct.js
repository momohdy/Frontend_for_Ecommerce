import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
} from "mdb-react-ui-kit";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function App() {
  // pass id as a prop , so i declared the reducer for states of this component but i didnt use it
  const location = useLocation();
  const productDetails = location.state;

  const [quantity, setQuantity] = useState(1);
  console.log(quantity);

  const resetQuantity = (i) => {
    setQuantity(i);
  };

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <MDBCardImage
                src={`${productDetails.image}`}
                fluid
                className="w-100"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            </MDBRipple>
          </MDBCard>
        </MDBCol>

        <MDBCol md="8" lg="6" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p>{productDetails.name}</p>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                    <MDBIcon fa icon="star" />
                    <MDBIcon fa icon="star" />
                    <MDBIcon fa icon="star" />
                    <MDBIcon fa icon="star" />
                  </div>
                </div>
              </div>
            </MDBCardBody>
            <hr class="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>{productDetails.description}</p>
              </div>
            </MDBCardBody>

            <hr class="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>Price : ${productDetails.price}</p>
              </div>

              <div className="d-flex justify-content-between">
                <p>
                  {productDetails.isBocked > 0 ? (
                    <div className="text-danger">In stock</div>
                  ) : (
                    <div className="text-danger">Out of stock</div>
                  )}
                </p>
              </div>
            </MDBCardBody>

            <hr class="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                <Link
                  to={"/"}
                  className="text-dark fw-bold text-decoration-none"
                >
                  Cancel
                </Link>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Quantity : {quantity}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Array.from(
                      { length: productDetails.countInStock },
                      (_, i) => (
                        <DropdownItem
                          key={i}
                          onClick={() => resetQuantity(i + 1)}
                        >
                          {i + 1}
                        </DropdownItem>
                      )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary">
                  <Link to={`../ShoppingCarts/${productDetails._id}/${quantity}`} state={productDetails} style={{ textDecoration: 'none', color: 'white' }}>
                    Add to cart
                  </Link>
                </Button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
