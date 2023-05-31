import React, { useState } from "react";
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, UPDATE } from "../../../../../redux/slices/carts";
import {
  ENDPOINT,
  formatCurrency,
  PresetUser,
} from "../../../../../components/utilities";

export default function Form({ item, index }) {
  const { token, theme } = useSelector(({ auth }) => auth),
    [quantity, setQuantity] = useState(item.quantity),
    dispatch = useDispatch();

  const handleArchives = () =>
    Swal.fire({
      icon: "question",
      title: `Do you want to archive this?`,
      html: item.name,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(DESTROY({ id: item._id, token }));
      }
    });

  const handleQuantity = (id, quantity) => {
    dispatch(
      UPDATE({
        data: { quantity },
        id: id,
        token,
      })
    );
  };
  return (
    <tr>
      <td>
        <img
          height={200}
          width={200}
          alt={item?.productId?._id}
          src={`${ENDPOINT}/assets/products/${item?.productId}.jpg`}
          className="img-fluid rounded me-2"
          onError={e => (e.target.src = PresetUser)}
        />
        <span
          className="h4"
          style={{ textDecoration: item.isComplete && "line-through" }}
        >
          {item?.name}
        </span>
      </td>
      <td>
        <MDBTypography tag={"span"}>
          {formatCurrency(item?.price)}
        </MDBTypography>
      </td>

      <td className="text-center">
        <span style={{ textDecoration: item.isComplete && "line-through" }}>
          {item.quantity}
        </span>
      </td>
    </tr>
  );
}
