import React from "react";
import { MDBBtn, MDBBtnGroup, MDBCol, MDBIcon } from "mdb-react-ui-kit";

export default function Pager({ total, setPage, page, size }) {
  const handlePage = action => {
    if (action) {
      page < total && setPage(prev => prev + 1);
    } else {
      page > 1 && setPage(prev => prev - 1);
    }
  };

  return (
    <MDBCol
      md={size || 6}
      className="d-flex justify-content-end align-items-center mt-md-0 mt-1"
    >
      <MDBBtnGroup>
        <MDBBtn
          size="sm"
          disabled={page <= 1}
          onClick={() => handlePage(false)}
        >
          <MDBIcon icon="angle-double-left" />
        </MDBBtn>
        <MDBBtn className="text-lowercase" size="sm">
          {page} of {total}
        </MDBBtn>
        <MDBBtn
          size="sm"
          onClick={() => handlePage(true)}
          disabled={page >= total}
        >
          <MDBIcon icon="angle-double-right" />
        </MDBBtn>
      </MDBBtnGroup>
    </MDBCol>
  );
}
