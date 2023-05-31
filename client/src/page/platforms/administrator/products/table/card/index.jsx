import React from "react";
import { MDBBadge, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { formatCurrency } from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, UPDATE } from "../../../../../../redux/slices/products";

export default function TableCard({ item, setData }) {
  const { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleArchives = () => {
    const action = item.deletedAt ? "restore" : "archive";

    Swal.fire({
      icon: "question",
      title: `Do you want to ${action} this?`,
      html: item.name,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (item.deletedAt) {
          dispatch(
            UPDATE({
              data: { deletedAt: "" },
              id: item._id,
              token,
            })
          );
        } else {
          dispatch(DESTROY({ id: item._id, token }));
        }
      }
    });
  };

  const handleStocks = () => {
    let color = "primary",
      message = "Plenty";

    if (item.stock <= 0) {
      color = "danger";
      message = "Depleted";
    } else if (item.stock <= 10) {
      color = "warning";
      message = "Low";
    }

    return (
      <MDBTooltip tag="span" wrapperClass="d-inline-block" title={message}>
        <MDBBadge color={color}>{item.stock}</MDBBadge>
      </MDBTooltip>
    );
  };

  return (
    <tr className="text-center">
      <td className="text-start">
        <p className="fw-bold mb-1 text-capitalize">{item.name}</p>
        <p className="text-muted mb-0">{formatCurrency(item.price)}</p>
      </td>
      <td>
        <p className="mb-0">
          {handleStocks()}
          {item.stock < 0 && (
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="This appears when a negative number is in stock, meaning the previous stated stock was wrong."
            >
              <MDBBadge color="info">
                <MDBIcon icon="info" />
              </MDBBadge>
            </MDBTooltip>
          )}
        </p>
      </td>
      <td className="text-center">
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title="Update product!"
        >
          <MDBBtn onClick={() => setData(item)} size="sm" color="info">
            <MDBIcon icon="pen" />
          </MDBBtn>
        </MDBTooltip>
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title={`${item.deletedAt ? "Restore" : "Archive"} product!`}
        >
          <MDBBtn
            size="sm"
            color={item.deletedAt ? "primary" : "warning"}
            onClick={handleArchives}
          >
            <MDBIcon icon={`trash-${item.deletedAt ? "restore" : "alt"}`} />
          </MDBBtn>
        </MDBTooltip>
      </td>
    </tr>
  );
}
