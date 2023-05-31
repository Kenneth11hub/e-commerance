import React from "react";
import { MDBBtn, MDBIcon, MDBNavbarItem, MDBTooltip } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { THEME } from "../../../redux/slices/auth";

const NavTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.auth);

  const handleTheme = () => dispatch(THEME(!theme.dark));

  return (
    <MDBNavbarItem className={theme.text}>
      <MDBTooltip
        tag="span"
        wrapperClass="d-inline-block"
        title={`Toggle ${theme.color} mode`}
      >
        <MDBBtn
          onClick={handleTheme}
          value={true}
          size="sm"
          color="transparent"
          className="shadow-0"
        >
          <MDBIcon
            icon={theme.dark ? "sun" : "moon"}
            size="lg"
            className="custom-navbar-icon"
          />
        </MDBBtn>
      </MDBTooltip>
    </MDBNavbarItem>
  );
};

export default NavTheme;
