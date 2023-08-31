import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  userGetProfileAction,
  userUbdateAction,
} from "../../actions/userActions";
// import { Link } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userGetProfile = useSelector((state) => state.userGetProfile);
  const { loading, error, user } = userGetProfile;

  const userLogin = useSelector((state) => state.userLoginAndLogout);
  const { userInformation } = userLogin;

  const userUbdate = useSelector((state) => state.userUbdate);
  const { success } = userUbdate;
  // console.log(objOfUbdatedData);

  

  useEffect(() => {
    if (!userInformation) {
      window.location.href= "/login";
    } else {
      if (!user.name) {
        dispatch(userGetProfileAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user , userInformation]);

  const handleOfSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password did not match");
    } else {
      dispatch(userUbdateAction(user._id ,name, email, password));
      // setMessage("Ubdated Successfully");
    }
  };

  return error ? (
    <Alert variant="danger">{error}</Alert>
  ) : loading ? (
    <Alert variant="info">Loading....</Alert>
  ) :  (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {message ? <Alert variant="danger"> {message} </Alert> : null}
      {success ? <Alert variant="success"> Profile Ubdated Successfully </Alert> : null}
      <MDBInput
        wrapperClass="mb-4"
        label="User Name"
        id="form1"
        type="name"
        value={name}
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
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
      <MDBInput
        wrapperClass="mb-4"
        label="Confirm Password"
        id="form3"
        type="password"
        value={confirmPassword}
        name="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <MDBBtn className="mb-4" type="submit" onClick={handleOfSubmit}>
        Ubdate
      </MDBBtn>
    </MDBContainer>
  );
}

export default App;
