import React from "react";
import { MDBBtn, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Index() {
  const { code } = useParams();

  const handleVerify = async () => {
    axios
      .get(`auth/validateEmail/${code}`, {
        headers: {
          Authorization: `QTracy ${code}`,
        },
      })
      .then(role => {
        window.location.replace(`/platform/${role.data}/dashboard`);
      });
    await localStorage.setItem("token", code);
    localStorage.removeItem("isLogin");
  };
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center
 text-center justify-content-center"
    >
      <MDBTypography tag={"h1"}>Click To Verify</MDBTypography>
      <MDBBtn onClick={() => handleVerify()}>Verify</MDBBtn>
    </MDBContainer>
  );
}
