import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { handlePagination } from "../../../../../components/utilities";
import TableCard from "./card";

const words = {
  singular: "sale",
  plural: "sales",
  empty: "Sales are empty!",
};

export default function ProductsTable({ items, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth),
    { isLoading } = useSelector(({ sales }) => sales);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption className="pt-1">List of {words.plural}</caption>
      <caption className="caption-top pb-1">
        Total of <b>{items.length}</b> {words.singular}(s)
      </caption>
      <MDBTableHead>
        {isLoading ? (
          <tr className="text-center">
            <td colSpan={4}>
              <MDBIcon far icon="clock" spin />
            </td>
          </tr>
        ) : items.length > 0 ? (
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col" className="text-start">
              Customer
            </th>
            <th scope="col">Total</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Status</th>
            <th scope="col">MOP</th>
            <th scope="col">Action</th>
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
              key={`sale-item-${index}`}
              page={page}
              index={index}
              item={item}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
