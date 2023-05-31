import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import BasicInfo from "./tabs/basic";
import Credentials from "./tabs/credentials";
import UserAgreement from "./tabs/agreement";

const titles = ["Basic Information", "Login Credentials", "User Agreement"];

const Register = () => {
  const [activeIndex, setActiveIndex] = useState(0),
    [form, setForm] = useState({}),
    { theme } = useSelector(({ auth }) => auth);

  const handleTabs = active => {
    switch (active) {
      case 1:
        return (
          <Credentials
            setActiveIndex={setActiveIndex}
            form={form}
            setForm={setForm}
          />
        );

      case 2:
        return <UserAgreement setActiveIndex={setActiveIndex} form={form} />;

      default:
        return (
          <BasicInfo
            setActiveIndex={setActiveIndex}
            form={form}
            setForm={setForm}
          />
        );
    }
  };

  return (
    <MDBContainer
      fluid
      className={`d-flex align-items-center min-height ${theme.skin} ${theme.skinText}`}
    >
      <MDBCol size={10} md={8} className="offset-md-2 offset-1 mt-5 mt-md-0">
        <MDBCard className={`text-center ${theme.bg} ${theme.text}`}>
          <MDBCardBody>
            <MDBCardTitle className="mb-4">{titles[activeIndex]}</MDBCardTitle>
            {handleTabs(activeIndex)}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
