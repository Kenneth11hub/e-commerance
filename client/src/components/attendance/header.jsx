import React from "react";
import { MDBTypography, MDBCol } from "mdb-react-ui-kit";
import { formatCurrency, fullName, miliToHours, months } from "../utilities";
import Company from "../../fakeDb/company";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function DTRHeader({
  month,
  setMonth,
  years,
  year,
  setYear,
  setIsFirst,
  isFirst,
  totalMili,
}) {
  const { user } = useSelector(({ attendances }) => attendances);

  const handleMonths = async () => {
    const inputOptions = {};

    months.map((month, index) => (inputOptions[index] = month));

    const { value: _month } = await Swal.fire({
      title: "Select a month",
      input: "select",
      inputPlaceholder: months[month],
      inputOptions,
      showCancelButton: true,
    });

    if (_month) {
      setMonth(Number(_month));
    }
  };

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
    <>
      <MDBCol className="text-center pt-2">
        <MDBTypography
          style={{ marginBottom: "-0.5%" }}
          className="fw-bold cursor-pointer"
          tag="h4"
          title="Click to print"
          onClick={window.print}
        >
          <u>{user.fullName ? fullName(user?.fullName) : "Invalid ID"}</u>
        </MDBTypography>
        <span>Name</span>
      </MDBCol>

      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="my-0"
        tag="h6"
        title="Selected date and cutoff to show"
      >
        For the month of:&nbsp;
        <u onClick={() => setIsFirst(!isFirst)} className="cursor-pointer">
          {isFirst ? "1st" : "2nd"} cutoff
        </u>
        &nbsp;-&nbsp;
        <u onClick={handleMonths} className="cursor-pointer">
          {months[month]}
        </u>
        ,&nbsp;
        <u onClick={handleYears} className="cursor-pointer">
          {year}
        </u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="my-0"
        tag="h6"
        title="Declared schedule by Manager"
      >
        Office Hours (regular days):&nbsp;
        <u>
          {Company.am} - {Company.pm} ({Company.regularHours} hrs)
        </u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="my-0"
        tag="h6"
        title="Declared rate by Manager"
      >
        Hourly Rate:&nbsp;
        <u>{formatCurrency(user?.rate)}</u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="my-0"
        tag="h6"
        title={`${miliToHours(totalMili).toFixed(2)} multiplied by ${
          user?.rate
        }`}
      >
        Total Pay:&nbsp;
        <u>{formatCurrency(miliToHours(totalMili) * user?.rate)}</u>
      </MDBTypography>
    </>
  );
}
