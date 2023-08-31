import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../actions/userActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const { userInformation } = useSelector((state) => state.userLoginAndLogout);
  //  console.log(userInformation);


  const logout = () => {
    dispatch(userLogoutAction());
  };

  // useEffect(() => {
  //   if(!userInformation){
  //     dispatch(userLogoutAction());
  //   }
  // },[userInformation , dispatch])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link
            className="text-decoration-none "
            style={{ color: "black" }}
            to={"/"}
          >
            ELMAHDY SHOP
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className="text-decoration-none "
                style={{ color: "black" }}
                to={"/ShoppingCarts"}
              >
                Carts
              </Link>
            </Nav.Link>

            {userInformation ? (
              <NavDropdown title={userInformation.name} id="username">
                <NavDropdown.Item>
                  <Link
                    className="text-decoration-none text-dark"
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <Link
                  className="text-decoration-none "
                  style={{ color: "black" }}
                  to={"/login"}
                >
                  Login
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
