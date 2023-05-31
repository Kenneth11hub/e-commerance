import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FIND } from "../../redux/slices/sales";
import ReceiptHeader from "./header";
import TableCard from "./card";
import { formatCurrency, fullMobile, fullName } from "../utilities";

export default function Receipt() {
  const { token, auth } = useSelector(({ auth }) => auth),
    { record } = useSelector(({ sales }) => sales),
    [newRec, setNewRec] = useState([]),
    dispatch = useDispatch(),
    { id, action } = useParams();

  useEffect(() => {
    if (action === "print") {
      if (record && record.items) {
        window.print();
        window.close();
      }
    }
  }, [action, record]);

  useEffect(() => {
    if (id) {
      dispatch(FIND({ id, token }));
    }
  }, [id]);
  useEffect(() => {
    if (record?.items?.length > 0) {
      var key =
        auth._id === "63aa7bd042b1e0d90e533f35"
          ? record?.farmerId?._id
          : auth._id;
      var newRecord = record.items.filter(
        item => item.productId.farmerId === key
      );
      if (newRecord?.length > 0) {
        setNewRec(newRecord);
      }
    }
  }, [record]);

  const handleTotal = () => {
    var t = 0;
    var key =
      auth._id === "63aa7bd042b1e0d90e533f35"
        ? record?.farmerId?._id
        : auth._id;
    if (record?.items?.length > 0) {
      var newRecord = record.items.filter(
        item => item.productId.farmerId === key
      );
      if (newRecord?.length > 0) {
        newRecord.map(item => {
          t += item.price * item.quantity;
        });
      }
    }
    return t;
  };
  return (
    <MDBContainer
      style={{
        fontFamily: "serif",
        fontSize: "12px",
        width: action === "print" ? "290px" : "100%",
      }}
      className="text-center"
    >
      {auth?.role?.name === "admin" && (
        <h1>Send into {fullMobile(record?.farmerId?.mobile)}</h1>
      )}
      <ReceiptHeader />
      <MDBTable
        style={{ fontSize: "12px" }}
        align="middle"
        hover
        responsive
        color="light"
        className="mb-0"
        small
        bordered
      >
        <caption className="caption-top pb-1">
          Total of&nbsp;
          <b>{record.items?.length}</b> item(s)
        </caption>
        {record.remarks && <caption className="py-1">{record.remarks}</caption>}

        <MDBTableHead className="text-center">
          <tr>
            <th scope="col" className="text-start">
              Details
            </th>
            {action !== "print" && <th scope="col">Initial Price</th>}
            <th scope="col">{action !== "print" && "Sold "}Price</th>
            <th scope="col">Amount</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {newRec.map((item, index) => (
            <TableCard key={`receipt-${index}`} item={item} action={action} />
          ))}
          <tr>
            <td colSpan={action === "print" ? 2 : 3} className="text-start">
              Total:
            </td>
            <td>{formatCurrency(handleTotal())}</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      <MDBTypography
        tag={"h5"}
        style={{ marginBottom: "-0.5%" }}
        className="d-flex justify-content-between"
      >
        Delivery Info:&nbsp;
        <u>{record.userId?.address}</u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="d-flex justify-content-between"
      >
        Customer:&nbsp;
        <u>{fullName(record.userId?.fullName)}</u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="d-flex justify-content-between"
      >
        Date:&nbsp;
        <u>{new Date(record.createdAt).toLocaleString()}</u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="d-flex justify-content-between"
      >
        Transaction ID:&nbsp;
        <u>{id.split("-")[0]}</u>
      </MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="text-center mt-2"
      >
        THIS RECEIPT SHALL BE VALID FOR <b>THREE(3) DAYS</b> FROM THE DATE OF
        THE PERMIT TO USE.
      </MDBTypography>
      <MDBTypography className="text-center mt-2">
        <strong>THANK YOU, SHOP AGAIN.</strong>
      </MDBTypography>
    </MDBContainer>
  );
}
