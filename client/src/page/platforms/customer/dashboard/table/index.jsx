import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { handlePagination } from "../../../../../components/utilities";
import TableCard from "./card";

export default function TasksTable({ items, page, setData, setIsBuy }) {
  const { maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        {items.length > 0 &&
          handlePagination(items, page, maxPage).map((item, index) => (
            <TableCard
              key={`item-${index}`}
              item={item}
              setData={setData}
              setIsBuy={setIsBuy}
            />
          ))}
      </MDBRow>
    </MDBContainer>
  );
}
