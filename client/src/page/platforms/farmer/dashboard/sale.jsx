import React, { useState } from "react";
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../components/utilities";
import { useEffect } from "react";

const DashboardSale = () => {
  const { statistics } = useSelector(({ sales }) => sales),
    [didIncrease, setDidIncrease] = useState(true),
    [percentage, setPercentage] = useState("0"),
    [previous, setPrevious] = useState(""),
    [today, setToday] = useState("");

  useEffect(() => {
    if (statistics.daily) {
      const { daily } = statistics,
        { value, previous } = daily.sale;

      if (value !== 0 && previous !== 0) {
        setPercentage(
          Number(((value - previous) / ((value + previous) / 2)) * 100).toFixed(
            2
          )
        );
      }

      setPrevious(formatCurrency(previous));
      setToday(formatCurrency(value));
      setDidIncrease(value > previous);
    }
  }, [statistics]);

  return (
    <MDBCol md={4} className="mb-1 mt-4 my-md-3">
      <MDBCard className="bg-warning text-white">
        <MDBCardBody className="pt-0">
          <MDBTypography tag="h4" className="mt-3">
            <MDBIcon icon="coins" className="me-2" />
            <b>Daily Sale</b>
          </MDBTypography>
          <MDBContainer
            style={{ fontSize: "20px" }}
            className="px-1 d-flex align-items-center justify-content-between"
          >
            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title={`Previous sale was ${previous}`}
            >
              <MDBIcon
                className="me-1"
                icon={`long-arrow-alt-${didIncrease ? "up" : "down"}`}
                color={didIncrease ? "success" : "danger"}
              />
              {percentage}%
            </MDBTooltip>
            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="As of today"
            >
              <MDBBadge>{today}</MDBBadge>
            </MDBTooltip>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default DashboardSale;
