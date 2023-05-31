import React from "react";
import { MDBBadge, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import {
  formatCurrency,
  fullName,
} from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../../../redux/slices/sales";

export default function TableCard({ item, index, page }) {
  const { maxPage, auth, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleReceipt = () =>
    window.open(
      `/receipt/${item._id}-${auth._id}/view`,
      "Receipt",
      "top=100px,width=500px,height=650px"
    );

  const handleStatus = stat => {
    switch (stat) {
      case "ordered":
        return "primary";

      case "preparing":
        return "secondary";

      case "pending":
        return "warning";

      case "transit":
        return "info";

      case "delivered":
        return "success";

      default:
        return "danger";
    }
  };

  const handleUpdateStatus = (status, id) => {
    dispatch(UPDATE({ data: { status }, id, token }));
  };
  return (
    <tr className="text-center">
      <td>
        <p className="mb-0">{++index + (page - 1) * maxPage}</p>
      </td>
      <td className="text-start">
        <p className="mb-0">{fullName(item.userId?.fullName)}</p>
      </td>
      <td>
        <p className="mb-0">
          {formatCurrency(item.total)}
          {item.overridden && (
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="Prices were overridden"
            >
              <MDBBadge className="ms-1">
                <MDBIcon icon="info" />
              </MDBBadge>
            </MDBTooltip>
          )}
        </p>
      </td>
      <td>
        <p className="fw-bold mb-1 text-capitalize">
          {new Date(item.createdAt).toDateString()}
        </p>
        <p className="text-muted mb-0">
          {new Date(item.createdAt).toLocaleTimeString()}
        </p>
      </td>
      <td>
        <MDBBadge
          className="ms-1 p-2 text-uppercase"
          color={handleStatus(item.status)}
        >
          {item.status}
        </MDBBadge>
      </td>
      <td className="text-center">
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title="View receipt"
        >
          <MDBBtn onClick={handleReceipt} size="sm" color="info">
            <MDBIcon icon="receipt" />
          </MDBBtn>
        </MDBTooltip>
        {item.status === "pending" && (
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title={`Cancell`}
          >
            <MDBBtn
              className="mx-2"
              onClick={() => handleUpdateStatus("cancell", item._id)}
              size="sm"
              color={"danger"}
            >
              <MDBIcon icon={"times"} />
            </MDBBtn>
          </MDBTooltip>
        )}
      </td>
    </tr>
  );
}
