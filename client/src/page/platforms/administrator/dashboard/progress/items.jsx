import React, { useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol } from "mdb-react-ui-kit";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useState } from "react";

const DashboardItems = () => {
  const { theme } = useSelector(({ auth }) => auth),
    { statistics } = useSelector(({ sales }) => sales),
    [categories, setCategories] = useState([]),
    [data, setData] = useState([]);

  useEffect(() => {
    if (statistics.demands) {
      const { demands } = statistics,
        { category, data } = demands;

      setCategories(category);
      setData(data);
    }
  }, [statistics]);

  return (
    <MDBCol md={6} className="my-1 my-md-0">
      <MDBCard className="bg-transparent">
        <MDBCardHeader className={`${theme.bg} ${theme.text} border-0`}>
          <h5 className="font-weight-bold mb-0">Items Overview</h5>
          <small className="d-block text-muted">Top 5 popular items</small>
        </MDBCardHeader>
        <MDBCardBody className={`${theme.bg} pt-0`}>
          <Chart
            options={{
              chart: {
                id: "dashboard-sales",
              },
              xaxis: {
                categories,
                labels: {
                  show: true,
                  hideOverlappingLabels: true,
                  trim: true,
                  style: {
                    colors: theme.dark && "#FBFBFB",
                  },
                },
              },
              yaxis: {
                labels: {
                  show: true,
                  style: {
                    colors: theme.dark && "#FBFBFB",
                  },
                },
              },
              stroke: {
                curve: "smooth",
                dashArray: 2.5,
                width: 2.5,
              },
              markers: {
                size: 2.5,
              },
            }}
            series={[
              {
                name: "Quantity",
                data,
              },
            ]}
            type="line"
            width="100%"
          />
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default DashboardItems;
