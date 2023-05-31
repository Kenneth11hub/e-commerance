import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBContainer,
  MDBTooltip,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../components/utilities";

const DashboardDaily = () => {
  const { statistics } = useSelector(({ sales }) => sales),
    [days, setDays] = useState(0),
    [today, setToday] = useState("-");

  useEffect(() => {
    if (statistics.daily) {
      const { daily } = statistics,
        { value, days } = daily.average;

      setDays(days);
      setToday(formatCurrency(value));
    }
  }, [statistics]);

  return (
    <MDBCol md={4} className="my-1 my-md-3">
      <MDBCard className="bg-success text-white">
        <MDBCardBody className="pt-0">
          <MDBTypography tag="h4" className="mt-3">
            <MDBIcon icon="money-bill" className="me-2" />
            <b>Daily Average</b>
          </MDBTypography>
          <MDBContainer
            style={{ fontSize: "20px" }}
            className="px-1 d-flex align-items-center justify-content-between"
          >
            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="Daily total divided by days"
            >
              {today}
            </MDBTooltip>

            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="Total of working days"
            >
              <MDBBadge>{days}</MDBBadge>
            </MDBTooltip>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default DashboardDaily;
