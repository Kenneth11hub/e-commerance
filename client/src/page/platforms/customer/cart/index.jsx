import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBSwitch,
} from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import CartsTable from "./table";
import { BROWSE } from "../../../../redux/slices/carts";
import CartModal from "./modal";
import { formatCurrency } from "../../../../components/utilities";
import { SAVE } from "../../../../redux/slices/sales";
import Company from "../../../../fakeDb/company";

const path = [
  {
    path: "Todo list",
  },
];

const Carts = () => {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ carts }) => carts),
    [carts, setCarts] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [visibility, setVisibility] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    [isCod, setCod] = useState(true),
    [data, setData] = useState([]),
    [toBuy, setToBuy] = useState([]),
    [pic, setPic] = useState(""),
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
    dispatch(BROWSE(token));
  }, [token]);

  useEffect(() => {
    if (data.length > 0) {
      setVisibility(true);
    }
  }, [data]);

  useEffect(() => {
    if (carts.length > 0) {
      let totalPages = Math.floor(carts.length / maxPage);
      if (carts.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [carts, page, maxPage]);

  useEffect(() => {
    setCarts(catalogs);
  }, [catalogs]);

  const handleSearch = string => {
    if (string) {
      setCarts(
        catalogs.filter(catalog =>
          catalog.productId.name.toLowerCase().startsWith(string.toLowerCase())
        )
      );
      setToBuy([]);
    } else {
      setCarts(catalogs);
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    var farmers = [];
    toBuy.map(async catalog => {
      var newFarmer = farmers.find(farmer => {
        return farmer.toString() === catalog.farmerId.toString();
      });

      if (farmers.length === 0 || !newFarmer) {
        await farmers.push(catalog.farmerId);
      }
    });
    var obj = {
      farmers,
      products: toBuy,
      userId: auth._id,
      total: handleTotal(),
      base64: pic,
      isCod: isCod,
      status: isCod ? "ordered" : "checking",
    };
    await dispatch(SAVE({ form: obj, token }));
    await dispatch(BROWSE(token));
    await setToBuy([]);
    setVisibility(false);
    setIsLoading(false);
  };

  const handleTotal = () => {
    var t = 0;
    if (toBuy.length > 0) {
      toBuy.map(item => {
        t += item.price * item.quantity;
      });
    }
    return t + Company.delivery;
  };
  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = e => {
      let image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        setPic(reader.result.split(",")[1]);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <BreadCrumb
        title="Carts"
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
              label="Search by Name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <CartsTable
            toBuy={toBuy}
            setToBuy={setToBuy}
            items={carts}
            page={page}
            setData={setData}
          />
          <div className="d-flex justify-content-end">
            <MDBTypography tag={"h3"} className="me-2 text-success">
              Delivery Fee: {Company.delivery}
            </MDBTypography>
            <MDBTypography tag={"h3"} className="me-2 text-success">
              Total: {formatCurrency(handleTotal())}
            </MDBTypography>
            <MDBBtn
              disabled={isLoading}
              onClick={() => setData(toBuy)}
              type="button"
              color="success"
            >
              Check out
            </MDBBtn>
          </div>
          <CartModal
            isCod={isCod}
            setCod={setCod}
            visibility={visibility}
            setVisibility={setVisibility}
            data={data}
            setData={setData}
            handleImageChange={handleImageChange}
          />
        </form>
      </MDBContainer>
    </>
  );
};

export default Carts;
