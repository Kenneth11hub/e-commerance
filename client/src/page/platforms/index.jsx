import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import TopNavigation from "../../components/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate(),
    [show, setShow] = useState(false),
    [sidebar, setSidebar] = useState([]),
    { theme, auth } = useSelector(state => state.auth);

  useEffect(() => {
    if (auth._id) {
      const { role } = auth;
      const baseUrl = `platform/${role.name}`;
      switch (role.name) {
        case "admin":
          setSidebar([
            {
              name: "Dashboard",
              icon: "tachometer-alt",
              path: `/${baseUrl}/dashboard`,
            },
            {
              name: "Farmer",
              icon: "user-tag",
              path: `/${baseUrl}/employees/farmer`,
            },
            {
              name: "Customer",
              icon: "user",
              path: `/${baseUrl}/employees/customer`,
            },
            {
              name: "Sales",
              icon: "shopping-cart",
              path: `/${baseUrl}/sales`,
            },
            {
              name: "Inventory",
              icon: "truck-loading",
              path: `/${baseUrl}/products`,
            },
          ]);
          break;

        case "farmer":
          setSidebar([
            {
              name: "Dashboard",
              icon: "tachometer-alt",
              path: `/${baseUrl}/dashboard`,
            },
            {
              name: "Sales",
              icon: "shopping-cart",
              path: `/${baseUrl}/sales`,
            },
            {
              name: "Inventory",
              icon: "truck-loading",
              path: `/${baseUrl}/products`,
            },
          ]);
          break;

        case "customer":
          setSidebar([
            {
              name: "Products",
              icon: "box",
              path: `/${baseUrl}/dashboard`,
            },
            {
              name: "Cart",
              icon: "shopping-cart",
              path: `/${baseUrl}/cart`,
            },
            {
              name: "Orders",
              icon: "clipboard-list",
              path: `/${baseUrl}/orders`,
            },
          ]);
          break;

        default:
          setSidebar([
            {
              name: "No role",
              icon: "exclamation-triangle",
              path: `/`,
            },
          ]);
          break;
      }
    }
  }, [auth, navigate]);

  const handleToggle = () => setShow(!show);

  return (
    <MDBContainer
      fluid
      className={`px-0 dashboard-container pb-5 ${theme.skin}`}
    >
      <div className="flexible-content">
        <TopNavigation show={show} profile toggle={handleToggle} />
        <main
          style={{
            marginLeft: window.innerWidth <= 768 ? 0 : 140,
          }}
          id="content"
          className="p-1 transition-all"
        >
          <Sidebar lists={sidebar} show={show} toggle={handleToggle} />
          <MDBContainer fluid className="mt-5 pt-3 px-0 mx-0">
            <Outlet />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
};

export default Dashboard;
