import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/shoppingCartsActions";

function App() {
  const { id, qty } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shoppingCarts);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const userLogin = useSelector((state) => state.userLoginAndLogout);
  const { userInformation } = userLogin;

  const loggedinOrNot = () => {
    if (userInformation) {
      window.location.href = "/shipping";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <Link to="/" className="text-body">
                        <Button variant="success">Continue shopping</Button>
                      </Link>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                      </div>
                    </div>

                    {cartItems.map((item, index) => {
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
                                    style={{ width: "65px" }}
                                    alt="Shopping item"
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {item.name}
                                  </MDBTypography>
                                  <p className="small mb-0">{item.brand}</p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "80px" }}>
                                  <MDBTypography
                                    tag="h5"
                                    className="fw-normal mb-0"
                                  >
                                    Qty : {item.quantity}
                                  </MDBTypography>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${item.price * item.quantity}
                                  </MDBTypography>
                                  <Button
                                    variant="danger"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                  
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-success text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$4818.00</p>
                        </div>
                        
                          <Button variant="primary" onClick={loggedinOrNot}>
                            PROCEED TO CHECKOUT
                          </Button>
                        
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
export default App;
