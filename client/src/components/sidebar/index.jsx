import React, { useEffect, useState } from "react";
import {
  MDBListGroupItem,
  MDBListGroup,
  MDBIcon,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import SidebarCard from "./card";
import Company from "../../fakeDb/company";
import { isMobile } from "mobile-device-detect";
import { POS } from "../../redux/slices/auth";

const cashierFeatures = [
  {
    key: "f2",
    icon: "pen-fancy",
    action: "update qty",
  },
  {
    key: "f3",
    icon: "coins",
    action: "override price",
  },
  {
    key: "f4",
    icon: "cash-register",
    action: "complete transaction",
  },
  {
    key: "f7",
    icon: "redo-alt",
    action: "reset transaction",
  },
  {
    key: "f9",
    icon: "search",
    action: "Search",
  },
  {
    key: "del",
    icon: "trash-alt",
    action: "delete item",
  },
];

const Sidebar = ({ lists, show, toggle }) => {
  const [activeMenu, setActiveMenu] = useState(null),
    navigate = useNavigate(),
    { auth } = useSelector(({ auth }) => auth),
    [currentPath, setCurrentPath] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div
      id="sidebar"
      style={{
        width: 140,
        left: !show && window.innerWidth <= 768 && "-140px",
      }}
      className="sidebar-fixed position-fixed transition-all"
    >
      <span
        onClick={() => {
          setCurrentPath(`/platform/${auth.role?.name}/dashboard`);
          navigate(`/platform/${auth.role?.name}/dashboard`);
          setActiveMenu("Dashboard");
        }}
        className="logo-wrapper waves-effect m-0 py-0 px-2 d-flex align-items-center cursor-pointer"
        style={{ height: window.innerWidth <= 768 ? "4.5rem" : "7.5rem" }}
      >
        <img
          src={Company.logo}
          draggable={false}
          style={{
            width: window.innerWidth <= 768 ? "3rem" : "4.5rem",
            height: window.innerWidth <= 768 ? "3rem" : "4.5rem",
          }}
          className="mx-auto"
          alt={Company.name}
        />
      </span>
      <MDBListGroup className="list-group-flush text-center">
        {auth.role?.name === "cashier" ? (
          <>
            {!isMobile && (
              <MDBListGroupItem
                className={`border-0 bg-transparent p-0 ${
                  window.innerHeight > 800 && "py-lg-3"
                }`}
              >
                <MDBBtn
                  className="m-0 px-0 w-100 shadow-0 text-light"
                  color="transparent"
                  onClick={() => dispatch(POS("f1"))}
                >
                  <span style={{ fontSize: "17.5px" }}>f1</span>
                  <MDBTypography tag="h6" className="special-header mb-1">
                    focus barcode
                  </MDBTypography>
                </MDBBtn>
              </MDBListGroupItem>
            )}
            {cashierFeatures.map((feature, index) => (
              <MDBListGroupItem
                key={`cashier-feature-${index}`}
                className={`border-0 bg-transparent p-0 ${
                  window.innerHeight > 800 && "py-lg-3"
                }`}
              >
                <MDBBtn
                  className="m-0 px-0 w-100 shadow-0 text-light"
                  color="transparent"
                  onClick={() => dispatch(POS(feature.key))}
                >
                  <span style={{ fontSize: "17.5px" }}>
                    {isMobile ? <MDBIcon icon={feature.icon} /> : feature.key}
                  </span>
                  <MDBTypography tag="h6" className="special-header mb-1">
                    {feature.action}
                  </MDBTypography>
                </MDBBtn>
              </MDBListGroupItem>
            ))}
          </>
        ) : (
          lists.map((list, index) =>
            list.children ? (
              <SidebarCard
                currentPath={currentPath}
                setCurrentPath={setCurrentPath}
                key={`link-${index}`}
                list={list}
                toggle={toggle}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            ) : (
              <MDBListGroupItem
                key={`sidebar-link-${index}`}
                className={`border-0 bg-transparent p-0  ${
                  window.innerHeight > 800 && "py-lg-3"
                }`}
              >
                <MDBBtn
                  onClick={() => {
                    setCurrentPath(list.path);
                    navigate(list.path);
                    setActiveMenu(list.name);

                    if (window.innerWidth <= 768) {
                      toggle();
                    }
                  }}
                  className="m-0 px-0 w-100 shadow-0 text-light"
                  color="transparent"
                >
                  <MDBIcon
                    icon={list.icon}
                    size={window.innerHeight < 800 ? "lg" : "2x"}
                    className={`text-${
                      currentPath === list.path ? "primary" : "muted"
                    }`}
                  />
                  <MDBTypography
                    tag="h6"
                    className={`special-header mb-1 text-${
                      currentPath === list.path ? "light" : "muted"
                    }`}
                  >
                    {list.name}
                  </MDBTypography>
                </MDBBtn>
              </MDBListGroupItem>
            )
          )
        )}
        {window.innerWidth <= 768 && (
          <MDBListGroupItem className="bg-transparent border-0 px-0 py-1 py-lg-3">
            <MDBBtn
              onClick={toggle}
              className={`m-0 px-0 w-100 shadow-0 text-light`}
              color="transparent"
            >
              <MDBIcon icon="times" size="lg" className="text-muted" />
            </MDBBtn>
          </MDBListGroupItem>
        )}
      </MDBListGroup>
    </div>
  );
};

export default Sidebar;
