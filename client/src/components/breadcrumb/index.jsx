import React from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const BreadCrumb = ({ paths = [], title, button = false, handleClick }) => {
  const navigate = useNavigate(),
    { theme, auth } = useSelector(state => state.auth);

  return (
    <MDBContainer fluid className={`custom-sticky-bread  ${theme.skin}`}>
      <MDBCol className="font-poppins">
        <MDBTypography
          tag="h5"
          style={{ width: "85%" }}
          className={`${theme.text} m-0 py-0 pe-2 d-flex align-items-center justify-content-between`}
        >
          {title}
          {button && (
            <MDBBtn size="sm" onClick={handleClick}>
              <MDBIcon icon="plus" />
            </MDBBtn>
          )}
        </MDBTypography>
        <MDBBreadcrumb className="custom-bread-height">
          <MDBBreadcrumbItem
            className={`${theme.text} custom-text cursor-pointer custom-path`}
            onClick={() => navigate(`/platform/${auth.role?.name}/dashboard`)}
          >
            Dashboard
          </MDBBreadcrumbItem>
          {paths?.map((path, index) => (
            <MDBBreadcrumbItem
              key={`bread-${index}`}
              className={`${theme.text} custom-text ${
                path.path && "custom-path cursor-pointer"
              }`}
              onClick={() => navigate(path.url)}
            >
              {path.path}
            </MDBBreadcrumbItem>
          ))}
        </MDBBreadcrumb>
      </MDBCol>
    </MDBContainer>
  );
};

export default BreadCrumb;
