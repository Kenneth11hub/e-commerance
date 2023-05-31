import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBContainer } from "mdb-react-ui-kit";
import ProductsTable from "./table";
import { BROWSE, FIND } from "../../../../redux/slices/sales";
import SalesHeader from "./header";

const path = [
  {
    path: "Sales",
  },
];

const Sales = () => {
  const { token, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs, record } = useSelector(({ sales }) => sales),
    [sales, setSales] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [month, setMonth] = useState(0),
    [year, setYear] = useState(0),
    [years, setYears] = useState([]),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth.role) {
      if (auth.role.name !== "admin") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      var creationYear = new Date(auth.createdAt).getFullYear(),
        latestYear = new Date().getFullYear(),
        years = [];

      while (creationYear <= latestYear) {
        years.push(latestYear);
        latestYear--;
      }

      setYears(years);
    }
  }, [auth]);

  useEffect(() => {
    const _today = new Date();
    setMonth(_today.getMonth());
    setYear(_today.getFullYear());
  }, [token]);

  useEffect(() => {
    if (year > 0 && auth._id) {
      setSearch("");
      dispatch(
        BROWSE({
          type: { month, year, id: auth?._id },
          token,
        })
      );
    }
  }, [month, year, auth]);

  useEffect(() => {
    if (sales.length > 0) {
      let totalPages = Math.floor(sales.length / maxPage);
      if (sales.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    } else {
      setPage(1);
      setTotalPages(1);
    }
  }, [sales, page]);

  useEffect(() => {
    setSales(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (record._id) {
      setSales([record]);
    }
  }, [record]);

  useEffect(() => {
    if (record._id && !search) {
      setSales(catalogs);
      setSearch("");
    }
  }, [search, record, catalogs]);

  const handleSearch = e => {
    e.preventDefault();

    const { id } = e.target;

    if (id.value) {
      dispatch(FIND({ id: id.value, token }));
    }
  };
  const handleStatus = key => {
    setStatus(key);
    setSales(
      catalogs.filter(catalog =>
        catalog.status.toLowerCase().startsWith(key.toLowerCase())
      )
    );
  };

  return (
    <>
      <BreadCrumb title="Sale history" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <SalesHeader
          handleStatus={handleStatus}
          setStatus={setStatus}
          status={status}
          totalPages={totalPages}
          handleSearch={handleSearch}
          page={page}
          setPage={setPage}
          month={month}
          setMonth={setMonth}
          years={years}
          year={year}
          search={search}
          setSearch={setSearch}
          setYear={setYear}
        />
        <ProductsTable items={sales} page={page} />
      </MDBContainer>
    </>
  );
};

export default Sales;
