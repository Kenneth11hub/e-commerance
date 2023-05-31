import React, { useEffect, useState } from "react";
import {
  MDBListGroupItem,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBListGroup,
  MDBRipple,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarCard = ({
  list,
  currentPath,
  setCurrentPath,
  activeMenu,
  setActiveMenu,
  toggle,
}) => {
  const { theme } = useSelector(({ auth }) => auth),
    navigate = useNavigate(),
    [active, setActive] = useState(false);

  useEffect(() => {
    const child = list.children.find(child => child.path === currentPath);
    if (typeof child !== "undefined") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [currentPath, list]);

  return (
    <MDBListGroupItem
      className={`border-0 bg-transparent p-0 ${
        window.innerHeight > 800 && "py-lg-3"
      }`}
    >
      <div className="dropdown-sidebar w-100">
        <MDBBtn
          className="dropbtn-sidebar m-0 px-0 w-100 shadow-0 text-light"
          color="transparent"
          onClick={() => {
            setActiveMenu(prev => (prev === list.name ? null : list.name));
            if (window.innerWidth <= 768) {
              toggle();
            }
          }}
        >
          <MDBIcon
            icon={list.icon}
            size={window.innerHeight < 800 ? "lg" : "2x"}
            className={`text-${active ? "primary" : "muted"}`}
          />
          <MDBTypography
            tag="h6"
            className={`special-header mb-1 text-${active ? "light" : "muted"}`}
          >
            {list.name}
          </MDBTypography>
        </MDBBtn>
        <div
          className={`custom-sidebar-dropdown-content ${theme.bg} ${
            activeMenu === list.name ? "d-block" : "d-none"
          }`}
        >
          <MDBListGroup>
            {list.children.map((item, index) => (
              <MDBRipple
                key={`profile-item-${index}`}
                rippleTag="span"
                rippleColor={theme.border}
              >
                <MDBListGroupItem
                  onClick={() => {
                    navigate(item.path);
                    setActiveMenu("");
                    setCurrentPath(item.path);
                  }}
                  className={`bg-transparent ${theme.text} border-0 cursor-pointer text-start`}
                >
                  <MDBRow>
                    <MDBCol size={1}>
                      <MDBIcon
                        icon={item.icon}
                        className={`text-${
                          currentPath === item.path ? "primary" : "muted"
                        }`}
                      />
                    </MDBCol>
                    <MDBCol
                      size={10}
                      className={`${
                        currentPath === item.path ? theme.text : "muted"
                      }`}
                    >
                      {item.name}
                    </MDBCol>
                  </MDBRow>
                </MDBListGroupItem>
              </MDBRipple>
            ))}
          </MDBListGroup>
        </div>
      </div>
    </MDBListGroupItem>
  );
};

export default SidebarCard;
