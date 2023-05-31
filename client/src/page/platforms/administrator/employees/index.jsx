import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import EmployeeTable from "./table";
import { BROWSE } from "../../../../redux/slices/users";
import ProductModal from "./modal";
import { fullName } from "../../../../components/utilities";
import { useParams } from "react-router-dom";

const path = [
  {
    path: "Employees",
  },
];

const Employees = () => {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ users }) => users),
    [employees, setEmployees] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [visibility, setVisibility] = useState(false),
    [data, setData] = useState({}),
    dispatch = useDispatch(),
    { type } = useParams();

  useEffect(() => {
    if (auth.role) {
      if (auth.role.name !== "admin") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, [auth]);

  useEffect(() => {
    dispatch(BROWSE({ token, key: type }));
  }, [token, type]);

  useEffect(() => {
    if (data && data._id) {
      setVisibility(true);
    }
  }, [data]);

  useEffect(() => {
    if (employees.length > 0) {
      let totalPages = Math.floor(employees.length / maxPage);
      if (employees.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [employees, page]);

  useEffect(() => {
    setEmployees(catalogs);
  }, [catalogs]);

  const handleSearch = string => {
    if (string) {
      setEmployees(
        catalogs.filter(catalog =>
          fullName(catalog.fullName)
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setEmployees(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Employee list"
        paths={path}
        button={false}
        handleClick={() => setVisibility(true)}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <EmployeeTable items={employees} page={page} setData={setData} />
      </MDBContainer>
      <ProductModal
        visibility={visibility}
        setVisibility={setVisibility}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Employees;
