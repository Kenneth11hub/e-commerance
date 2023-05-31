import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { handlePagination } from "../../../../../components/utilities";
import TableCard from "./card";

const words = {
  singular: "product",
  plural: "products",
  empty: "Products are empty!",
};

export default function ProductsTable({ items, page, setData }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption className="pt-1">List of {words.plural}</caption>
      <caption className="caption-top pb-1">
        Total of <b>{items.length}</b> {words.singular}(s)
      </caption>
      <MDBTableHead>
        {items.length > 0 ? (
          <tr className="text-center">
            <th scope="col" className="text-start">
              Name & Price
            </th>
            <th scope="col">Stock</th>
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
            <TableCard key={`item-${index}`} item={item} setData={setData} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
