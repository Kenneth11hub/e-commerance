import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import Company from "../../../../../fakeDb/company";

export default function ReceiptHeader() {
  return (
    <>
      <MDBTypography
        className="fw-bold cursor-pointer text-capitalize pt-2 mb-0"
        title="Click to print"
        onClick={window.print}
      >
        {Company.name}
      </MDBTypography>
      <MDBTypography
        className="mb-0"
        title="Click to print"
        onClick={window.print}
      >
        {Company.address}
      </MDBTypography>
      <MDBTypography
        title="Click to print"
        style={{ marginBottom: "-5%" }}
        onClick={window.print}
      >
        {Company.contact}
      </MDBTypography>
    </>
  );
}
