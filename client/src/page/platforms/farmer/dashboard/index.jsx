import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import DashboardSales from "./progress/sales";
import DashboardItems from "./progress/items";
import BreadCrumb from "../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DashboardSale from "./sale";
import DashboardDaily from "./daily";
import DashboardMonthly from "./monthly";
import { STATISTICS } from "../../../../redux/slices/sales";

const Manager = () => {
  const { auth, token } = useSelector(state => state.auth),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth.role) {
      if (auth.role.name !== "farmer") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, [auth]);

  useEffect(() => {
    dispatch(STATISTICS(token));
  }, [token]);

  return (
    <>
      <BreadCrumb title="Dashboard" />

      <MDBContainer className="pt-5">
        <MDBRow>
          <DashboardSale />
          <DashboardDaily />
          <DashboardMonthly />
        </MDBRow>
        <MDBRow>
          <DashboardSales />
          <DashboardItems />
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Manager;
