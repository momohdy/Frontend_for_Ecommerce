import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import { Link } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLoginAndLogout = useSelector((state) => state.userLoginAndLogout);

  const { loading, error, userInformation } = userLoginAndLogout;

  useEffect(() => {
    if(userInformation) {
      window.location.href = "/"
     }
  },[userInformation ])

  const handleOfSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(userLoginAction(email, password)) 
      window.history.back();
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return error ? (
    <Alert variant="danger">{error}</Alert>
  ) : loading ? (
    <Alert variant="info">Loading....</Alert>
  ) : (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <MDBBtn className="mb-4" type="submit" onClick={handleOfSubmit}>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default App;
