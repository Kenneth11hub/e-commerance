import { MDBBadge, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import React from "react";
import { formatCurrency } from "../../utilities";

export default function TableCard({ item, action }) {
  return (
    <tr>
      <td className="text-start py-0">
        <p className="fw-normal mb-0 text-capitalize">{item.productId?.name}</p>
        <p className="text-muted mb-0">{item.quantity} units</p>
        <p className="text-muted mb-0">{"Expitration " + item.expiry} Date</p>
      </td>
      {action !== "print" && (
        <td>{formatCurrency(item.overridden || item.price)}</td>
      )}
      <td>
        {formatCurrency(item.price)}
        {action !== "print" && item.overridden && (
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title={`Price were set ${
              item.overridden > item.price ? "lower" : "higher"
            } than initial price`}
          >
            <MDBBadge className="ms-1" color="dark">
              <MDBIcon
                size="sm"
                icon={`angle-double-${
                  item.overridden > item.price ? "down" : "up"
                }`}
              />
            </MDBBadge>
          </MDBTooltip>
        )}
      </td>
      <td>{formatCurrency(item.price * item.quantity)}</td>
    </tr>
  );
}
