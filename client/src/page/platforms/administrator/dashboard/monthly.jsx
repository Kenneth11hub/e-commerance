import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBContainer,
  MDBBadge,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../components/utilities";

const DashboardMonthly = () => {
  const { statistics } = useSelector(({ sales }) => sales),
    [months, setMonths] = useState(0),
    [today, setToday] = useState("-");

  useEffect(() => {
    if (statistics.monthly) {
      const { monthly } = statistics,
        { value, months } = monthly.average;

      setMonths(months);
      setToday(formatCurrency(value));
    }
  }, [statistics]);

  return (
    <MDBCol md={4} className="mt-1 mb-3 my-md-3">
      <MDBCard className="bg-info text-white">
        <MDBCardBody className="pt-0">
          <MDBTypography tag="h4" className="mt-3">
            <MDBIcon icon="money-bill" className="me-2" />
            <b>Monthly Average</b>
          </MDBTypography>
          <MDBContainer
            style={{ fontSize: "20px" }}
            className="px-1 d-flex align-items-center justify-content-between"
          >
            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="Monthly total divided by months"
            >
              {today}
            </MDBTooltip>

            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="Total of working months"
            >
              <MDBBadge>{months}</MDBBadge>
            </MDBTooltip>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default DashboardMonthly;
