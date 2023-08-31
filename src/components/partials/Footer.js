import React from "react";
import {
  MDBFooter,
  MDBContainer,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <footer>
      <MDBFooter className="text-center" color="white" bgColor="dark">
        <MDBContainer className="p-4">
          
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright @ Mostafa Mohdy
        </div>
      </MDBFooter>
    </footer>
  );
}
