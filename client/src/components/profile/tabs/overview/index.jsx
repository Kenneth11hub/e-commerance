import React from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { fullMobile, fullName, getAge } from "../../../utilities";
import { useSelector } from "react-redux";

const ProfileOverview = ({ setActiveIndex }) => {
  const { theme, auth } = useSelector(state => state.auth);

  return (
    <MDBContainer fluid className="px-0">
      <MDBTypography
        tag="h4"
        className={`d-flex justify-content-between align-items-center pb-3 mb-0 border-bottom border-${theme.border}`}
      >
        <span>Details</span>
        <MDBBtn color="primary" size="sm" onClick={() => setActiveIndex(1)}>
          Edit Profile
        </MDBBtn>
      </MDBTypography>
      <MDBRow className="mt-3">
        <MDBCol size={2} md={3} className="text-muted">
          <MDBTypography className="mb-0">Full Name</MDBTypography>
        </MDBCol>
        <MDBCol size={10} md={9}>
          <MDBTypography className="mb-0 text-capitalize">
            {fullName(auth.fullName)}
          </MDBTypography>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
        <MDBCol size={2} md={3} className="text-muted">
          <MDBTypography className="mb-0">Mobile #</MDBTypography>
        </MDBCol>
        <MDBCol size={10} md={9}>
          <MDBTypography className="mb-0">
            {fullMobile(auth.mobile) || "XXXXXXXXXX"}
          </MDBTypography>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
        <MDBCol size={2} md={3} className="text-muted">
          <MDBTypography className="mb-0">Full Address</MDBTypography>
        </MDBCol>
        <MDBCol size={10} md={9}>
          <MDBTypography className="mb-0">
            {auth.address || <i>Empty</i>}
          </MDBTypography>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
        <MDBCol size={2} md={3} className="text-muted">
          <MDBTypography className="mb-0">Birthday and Age</MDBTypography>
        </MDBCol>
        <MDBCol size={10} md={9}>
          <MDBTypography className="mb-0">
            {new Date(auth?.dob).toDateString()},&nbsp;{getAge(auth?.dob)} yr(s)
            old
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProfileOverview;
