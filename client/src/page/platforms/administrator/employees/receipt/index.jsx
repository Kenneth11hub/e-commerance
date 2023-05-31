import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SALES } from "./../../../../../redux/slices/sales";
import ReceiptHeader from "./header";
import TableCard from "./card";
import { formatCurrency, fullName } from "../../../../../components/utilities";

export default function Receipt() {
  const { token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ sales }) => sales),
    dispatch = useDispatch(),
    { id, action } = useParams();

  useEffect(() => {
    if (action === "print") {
      if (catalogs.length) {
        window.print();
        window.close();
      }
    }
  }, [action, catalogs]);

  useEffect(() => {
    if (id) {
      dispatch(SALES({ id, token }));
    }
  }, [id]);

  const handleTotal = () => {
    var t = 0;
    if (catalogs?.length > 0) {
      catalogs.map(item => {
        t += item.total;
      });
    }
    return t;
  };
  return (
    <MDBContainer
      style={{
        fontFamily: "serif",
        fontSize: "12px",
        width: "100%",
      }}
      className="text-center"
    >
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
          <b>{catalogs.length}</b> item(s)
        </caption>

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
          {catalogs?.map((item, index) => (
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
    </MDBContainer>
  );
}
