import React from "react";
import { MDBBadge, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import {
  ENDPOINT,
  formatCurrency,
  fullName,
} from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../../../redux/slices/sales";
import Swal from "sweetalert2";

export default function TableCard({ item, index, page }) {
  const { maxPage, auth, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleReceipt = () =>
    window.open(
      `/receipt/${item._id}-${auth._id}/print`,
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

  const handleMark = status => {
    var attr = {
      color: "",
      icon: "",
      status: "",
    };
    switch (status) {
      case "ordered":
        attr.color = "primary";
        attr.icon = "check";
        attr.status = "preparing";
        break;
      case "preparing":
        attr.color = "secondary";
        attr.icon = "hands-helping";
        attr.status = "pending";
        break;

      case "pending":
        attr.color = "warning";
        attr.icon = "people-carry";
        attr.status = "transit";
        break;

      case "transit":
        attr.color = "success";
        attr.icon = "opencart";
        attr.fab = true;
        attr.status = "delivered";
        break;
      default:
        attr.color = "danger";
        attr.icon = "times";
        attr.status = "cancell";
    }
    return attr;
  };
  const handleUpdateStatus = (status, id) => {
    dispatch(UPDATE({ data: { status }, id, token }));
  };

  const handleCheck = id => {
    Swal.fire({
      imageUrl: `${ENDPOINT}/assets/prof/${id}.jpg`,
      imageHeight: 300,
      imageAlt: "A tall image",
    });
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
      <td>
        <MDBBadge
          onClick={() => handleCheck(item._id)}
          className="ms-1 p-2 text-uppercase"
          color={item.isCod ? "success" : "info"}
        >
          {item.isCod ? "COD" : "GCASH"}
        </MDBBadge>
      </td>
      <td className="text-center">
        {item.status !== "checking" && item.status !== "delivered" && (
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title={`Mark as ${handleMark(item.status).status}`}
          >
            <MDBBtn
              className="mx-2"
              onClick={() =>
                handleUpdateStatus(handleMark(item.status).status, item._id)
              }
              size="sm"
              color={handleMark(item.status).color}
            >
              <MDBIcon
                fab={handleMark(item.status).fab}
                icon={handleMark(item.status).icon}
              />
            </MDBBtn>
          </MDBTooltip>
        )}
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title="View receipt"
        >
          <MDBBtn onClick={handleReceipt} size="sm" color="info">
            <MDBIcon icon="receipt" />
          </MDBBtn>
        </MDBTooltip>
      </td>
    </tr>
  );
}
