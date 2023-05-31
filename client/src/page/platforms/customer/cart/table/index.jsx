import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { handlePagination } from "../../../../../components/utilities";
import TableCard from "./card";

const words = {
  singular: "cart",
  plural: "cart",
  empty: "Your cart is empty add to cart now",
};

export default function CartTable({ items, page, setToBuy, toBuy }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption className="pt-1">List of {words.plural}</caption>
      <caption className="caption-top pb-1">
        Total of <b>{items.length}</b> {words.singular}(es)
      </caption>
      <MDBTableHead>
        {items.length > 0 ? (
          <tr className="text-center">
            <th scope="col" style={{ width: "20px" }} className="text-start">
              Checkbox
            </th>
            <th scope="col" className="text-start">
              Product
            </th>
            <th scope="col" className="text-start">
              Price
            </th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>{words.empty}</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {items.length > 0 &&
          handlePagination(items, page, maxPage).map((item, index) => (
            <TableCard
              toBuy={toBuy}
              setToBuy={setToBuy}
              key={`tasks-${index}`}
              item={item}
              index={index}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
