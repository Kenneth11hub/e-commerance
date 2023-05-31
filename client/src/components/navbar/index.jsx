import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCol,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBTooltip,
} from "mdb-react-ui-kit";
import Company from "../../fakeDb/company";
import { useSelector } from "react-redux";
import NavbarProfile from "./profile";
import NavbarNotifications from "./notification";
import NavTheme from "./theme";
import { NavLink } from "react-router-dom";
import "./index.css";

const TopNavigation = ({ profile, toggle, links }) => {
  const { auth, theme } = useSelector(state => state.auth);

  return (
    <MDBNavbar
      expand="lg"
      dark={theme.dark}
      className={theme.topbar}
      fixed="top"
    >
      <MDBContainer fluid className="py-2 transition-all">
        <MDBCol size={2}>
          {toggle ? (
            <MDBBtn
              onClick={toggle}
              size="sm"
              color={theme.color}
              className="shadow-0"
            >
              <MDBIcon icon="bars" />
            </MDBBtn>
          ) : (
            <MDBNavbarBrand className={`cursor-pointer ${theme.text}`}>
              {Company.name}
            </MDBNavbarBrand>
          )}
        </MDBCol>

        <MDBCol>
          <MDBNavbarNav className="d-flex flex-row align-items-center justify-content-end">
            {links?.map((link, index) => (
              <MDBNavbarItem className=" mx-1 mx-md-2" key={`topnav-${index}`}>
                <NavLink
                  to={link.path}
                  className={`mx-auto ${theme.text} custom-links-font`}
                >
                  {link.name}
                </NavLink>
              </MDBNavbarItem>
            ))}
            {profile && (
              <>
                {/* <NavbarTodo /> */}

                {auth.role?.name === "cashier" && <NavbarNotifications />}
                <NavTheme />
                <NavbarProfile />
              </>
            )}
          </MDBNavbarNav>
        </MDBCol>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default TopNavigation;
