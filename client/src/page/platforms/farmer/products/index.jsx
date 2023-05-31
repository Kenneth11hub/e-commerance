import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import ProductsTable from "./table";
import { BROWSE } from "../../../../redux/slices/products";
import ProductModal from "./modal";

const path = [
  {
    path: "Inventory",
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
    dispatch = useDispatch();

  useEffect(() => {
    if (auth.role) {
      if (auth.role.name !== "farmer") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, [auth]);

  useEffect(() => {
    dispatch(BROWSE({ key: auth._id, token }));
  }, [token, auth]);

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
  }, [products, page]);

  useEffect(() => {
    if (catalogs.length > 0) {
      const newArr = [...catalogs];
      var desc = newArr.sort((a, b) => a.stock - b.stock);
      desc.sort(
        (a, b) =>
          Number(a.deletedAt ? true : false) -
          Number(b.deletedAt ? true : false)
      );
      setProducts(desc);
    }
  }, [catalogs]);

  const handleSearch = string => {
    if (string) {
      setProducts(
        catalogs.filter(catalog =>
          catalog.name.toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      const newArr = [...catalogs];
      var desc = newArr.sort((a, b) => a.stock - b.stock);
      desc.sort(
        (a, b) =>
          Number(a.deletedAt ? true : false) -
          Number(b.deletedAt ? true : false)
      );
      setProducts(desc);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Product list"
        paths={path}
        button={true}
        handleClick={() => setVisibility(true)}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <ProductsTable items={products} page={page} setData={setData} />
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

export default Products;
