import React from "react";
import {
  MDBCardImage,
  MDBCol,
  MDBInput,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  ENDPOINT,
  formatCurrency,
  PresetUser,
} from "../../../../../components/utilities";

export default function ModalForm({ form, handleForm }) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <>
      <MDBRow className="my-2">
        <MDBCol size={12}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage
              src={`${ENDPOINT}/assets/products/${form._id}.jpg`}
              fluid
              alt="..."
              onError={e => (e.target.src = PresetUser)}
            />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
        </MDBCol>
      </MDBRow>
      <MDBRow className="my-2">
        <MDBCol size={12}>
          Description:
          <MDBTypography tag={"h3"}>{form.description}</MDBTypography>
        </MDBCol>
      </MDBRow>

      <MDBRow className="my-2">
        <MDBCol size={12}>
          {form.isDiscounted ? (
            <>
              <MDBTypography
                tag={"span"}
                className="text-decoration-line-through h4"
              >
                {formatCurrency(form.price)}
              </MDBTypography>
              <MDBTypography tag={"span"} className="h4">
                {" - "}
              </MDBTypography>
              <MDBTypography tag={"span"} className="text-success h4">
                {formatCurrency(form.discounted)}
              </MDBTypography>
            </>
          ) : (
            formatCurrency(form.price)
          )}
        </MDBCol>
      </MDBRow>
      <MDBCol size={12}>
        <MDBInput
          label="Quantity"
          type={"number"}
          max={form.stock}
          value={String(form.quantity)}
          onChange={e => handleForm("quantity", Number(e.target.value))}
          defaultValue={1}
          onInput={e => e.target.setCustomValidity("")}
          contrast={theme.dark}
        />
      </MDBCol>
      <MDBCol size={12}>
        <MDBTypography tag={"span"} className="text-success h4">
          {formatCurrency(
            form.isDiscounted
              ? form.discounted * form.quantity
              : form.price * form.quantity
          )}
        </MDBTypography>
      </MDBCol>
    </>
  );
}
