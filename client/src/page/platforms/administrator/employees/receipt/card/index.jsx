import { MDBBadge, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import React from "react";
import {
  formatCurrency,
  fullName,
} from "../../../../../../components/utilities";

export default function TableCard({ item, action }) {
  return (
    <tr>
      <td className="text-start py-0">
        <p className="fw-normal mb-0 text-capitalize">
          {fullName(item.userId?.fullName)}
        </p>
      </td>
      <td>{formatCurrency(item.total)}</td>
      <td>{item.status}</td>
      <td>{new Date(item.createdAt).toDateString()}</td>
    </tr>
  );
}
