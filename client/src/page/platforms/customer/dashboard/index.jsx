import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import ProductsTable from "./table";
import { BROWSE } from "../../../../redux/slices/products";
import ProductModal from "./modal";

const path = [
  {
    path: "Todo list",
  },
];

const Products = () => {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ products }) => products),
    [products, setProducts] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [visibility, setVisibility] = useState(false),
    [data, setData] = useState({}),
    [isBuy, setIsBuy] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth.role) {
      if (auth.role.name !== "customer") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, [auth]);

  useEffect(() => {
    dispatch(BROWSE({ token, key: "customer" }));
  }, [token]);

  useEffect(() => {
    if (data && data._id) {
      setVisibility(true);
    }
  }, [data]);

  useEffect(() => {
    if (products.length > 0) {
      let totalPages = Math.floor(products.length / maxPage);
      if (products.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [products, page, maxPage]);

  useEffect(() => {
    setProducts(catalogs);
  }, [catalogs]);

  const handleSearch = string => {
    if (string) {
      setProducts(
        catalogs.filter(catalog =>
          catalog.name.toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setProducts(catalogs);
    }
  };
  const handleCategory = string => {
    if (string) {
      setProducts(
        catalogs.filter(catalog =>
          catalog.category.toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setProducts(catalogs);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Products"
        paths={path}
        button={false}
        handleClick={() => setVisibility(true)}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={5}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>

          <MDBCol size={5}>
            <MDBInputGroup
              textBefore={<span className={theme.text}>Category</span>}
            >
              <select
                onChange={e => handleCategory(e.target.value)}
                className={`form-control ${theme.bg} ${theme.text}`}
              >
                <option selected disabled value="">
                  Select Category...
                </option>
                <option value="FRUIT">FRUIT</option>
                <option value="VEGTABLE">VEGTABLE</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} size={2} />
        </MDBRow>
        <ProductsTable
          setIsBuy={setIsBuy}
          items={products}
          page={page}
          setData={setData}
        />
      </MDBContainer>
      <ProductModal
        visibility={visibility}
        setVisibility={setVisibility}
        isBuy={isBuy}
        data={data}
        setData={setData}
      />
    </>
  );
};

export default Products;
