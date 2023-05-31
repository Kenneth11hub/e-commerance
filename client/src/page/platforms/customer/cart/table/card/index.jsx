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
import { DESTROY, UPDATE } from "../../../../../../redux/slices/carts";
import {
  ENDPOINT,
  formatCurrency,
  PresetUser,
} from "../../../../../../components/utilities";

export default function TableCard({ item, toBuy, setToBuy, index }) {
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

  const handleMark = async (data, isChecked) => {
    var order = {};
    order.productId = data.productId._id;
    order.price = data?.productId.isDiscounted
      ? data?.productId?.discounted
      : data?.productId?.price;
    order.quantity = data.quantity;
    order.id = data._id;
    order.isOrdered = false;
    order.index = index;
    order.farmerId = data.productId.farmerId;
    if (isChecked) {
      var newArr = [...toBuy, order];
      await setToBuy(newArr);
    } else {
      var newArr = toBuy.filter(item => {
        return item.productId !== data.productId._id;
      });
      await setToBuy(newArr);
    }
  };

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
        <MDBCheckbox
          onChange={e => {
            handleMark(item, e.target.checked);
          }}
          name="flexCheck"
          id="flexCheckDefault"
        />
      </td>
      <td>
        <img
          height={200}
          width={200}
          alt={item?.productId?._id}
          src={`${ENDPOINT}/assets/products/${item?.productId?._id}.jpg`}
          className="img-fluid rounded me-2"
          onError={e => (e.target.src = PresetUser)}
        />
        <span
          className="h4"
          style={{ textDecoration: item.isComplete && "line-through" }}
        >
          {item?.productId.name}
        </span>
      </td>
      <td>
        {item?.productId.isDiscounted ? (
          <>
            <MDBTypography
              tag={"span"}
              className="text-decoration-line-through h4"
            >
              {formatCurrency(item?.productId.price)}
            </MDBTypography>
            <MDBTypography tag={"span"} className="h4">
              {" - "}
            </MDBTypography>
            <MDBTypography tag={"span"} className="text-success h4">
              {formatCurrency(item?.productId.discounted)}
            </MDBTypography>
          </>
        ) : (
          formatCurrency(item?.productId?.price)
        )}
      </td>
      <td className="text-center">
        <MDBRow>
          <MDBCol size={quantity !== item.quantity ? 8 : 12}>
            <MDBInput
              width={"50%"}
              label="Quantity"
              value={String(quantity)}
              onChange={async e => {
                setQuantity(Number(e.target.value));
              }}
              required
              onInvalid={e =>
                e.target.setCustomValidity("We name for this task.")
              }
              onInput={e => e.target.setCustomValidity("")}
              contrast={theme.dark}
            />
          </MDBCol>
          {quantity !== item.quantity && (
            <MDBCol size={4}>
              <MDBBtn onClick={() => handleQuantity(item._id, quantity)}>
                Update
              </MDBBtn>
            </MDBCol>
          )}
        </MDBRow>
      </td>
      <td className="text-center">
        <span
          className="h4"
          style={{ textDecoration: item.isComplete && "line-through" }}
        >
          {item?.productId.isDiscounted
            ? formatCurrency(item?.productId.discounted * quantity)
            : formatCurrency(item?.productId.price * quantity)}
        </span>
      </td>
    </tr>
  );
}
