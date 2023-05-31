import React from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Pager from "../../../../components/pager";
import { months } from "../../../../components/utilities";

export default function SalesHeader({
  totalPages,
  handleSearch,
  page,
  setPage,
  month,
  setMonth,
  years,
  year,
  setYear,
  search,
  setSearch,
}) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBRow className="mb-3">
      <MDBCol md={3} className="mb-md-0 mb-1">
        <form onSubmit={handleSearch}>
          <MDBInput
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            name="id"
            label="Search by Transaction ID"
            contrast={theme.dark}
          />
        </form>
      </MDBCol>
      <MDBCol md={2} size={8}>
        <select
          value={String(month)}
          className="form-control"
          onChange={e => setMonth(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option value={index} key={`${month}-${index}`}>
              {month}
            </option>
          ))}
        </select>
      </MDBCol>
      <MDBCol md={1} size={4}>
        <select
          value={String(year)}
          className="form-control"
          onChange={e => setYear(Number(e.target.value))}
        >
          {years.map((year, index) => (
            <option value={year} key={`${year}-${index}`}>
              {year}
            </option>
          ))}
        </select>
      </MDBCol>
      <Pager setPage={setPage} total={totalPages} page={page} />
    </MDBRow>
  );
}
