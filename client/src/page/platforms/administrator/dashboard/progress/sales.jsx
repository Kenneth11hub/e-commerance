import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBTooltip,
} from "mdb-react-ui-kit";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { OVERVIEW } from "../../../../../redux/slices/sales";

const DashboardSales = () => {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { overview } = useSelector(({ sales }) => sales),
    [data, setData] = useState([]),
    [categories, setCategories] = useState([]),
    [years, setYears] = useState([]),
    [year, setYear] = useState(0),
    dispatch = useDispatch();

  useEffect(() => {
    if (overview) {
      const { data, category, years } = overview;

      setCategories(category);
      setData(data);
      setYears(years);
    }
  }, [overview]);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (year > 0 && auth._id) {
      dispatch(OVERVIEW({ year, token, id: auth._id }));
    }
  }, [token, year, auth]);

  const handleYears = async () => {
    const inputOptions = {};

    years.map(year => (inputOptions[year] = year));

    const { value: _year } = await Swal.fire({
      title: "Select a year",
      input: "select",
      inputPlaceholder: year,
      inputOptions,
      showCancelButton: true,
    });

    if (_year) {
      setYear(Number(_year));
    }
  };

  return (
    <MDBCol md={6} className="my-1 my-md-0">
      <MDBCard className="bg-transparent">
        <MDBCardHeader className={`${theme.bg} ${theme.text} border-0`}>
          <h5 className="font-weight-bold mb-0">Sales Overview</h5>
          <small className="d-block text-muted">
            Sale statistics of&nbsp;
            <MDBTooltip
              placement="bottom"
              tag="span"
              wrapperClass="d-inline-block"
              title="Click to change year"
            >
              <u onClick={handleYears} className="cursor-pointer">
                {year}
              </u>
            </MDBTooltip>
          </small>
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
                name: "Total",
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

export default DashboardSales;
