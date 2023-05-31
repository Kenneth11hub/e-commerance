import React from "react";
import {
  MDBBtnGroup,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBSwitch,
  MDBTextArea,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { ENDPOINT, PresetUser } from "../../../../../components/utilities";
import { UPLOAD } from "../../../../../redux/slices/auth";

export default function ModalForm({ form, handleForm, handleImageChange }) {
  const { theme, auth } = useSelector(({ auth }) => auth);

  const handleChangeProfile = () =>
    document.getElementById("uploadProfile").click();

  return (
    <>
      <MDBCol size={12}>
        <MDBInput
          label="Name"
          value={form.name}
          onChange={e => handleForm("name", e.target.value)}
          required
          onInvalid={e =>
            e.target.setCustomValidity("We need a name for this.")
          }
          onInput={e => e.target.setCustomValidity("")}
          contrast={theme.dark}
        />
      </MDBCol>
      <MDBRow className="my-3">
        <MDBCol size={12}>
          <MDBTextArea
            rows={4}
            label="Description"
            value={form.description}
            onChange={e => handleForm("description", e.target.value)}
            required
            onInvalid={e =>
              e.target.setCustomValidity("We need a description for this.")
            }
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="my-3">
        <MDBCol size={4}>
          <MDBInputGroup
            textBefore={<span className={theme.text}>Category</span>}
          >
            <select
              value={form.category}
              onChange={e => handleForm("category", e.target.value)}
              className={`form-control ${theme.bg} ${theme.text}`}
            >
              <option selected disabled value="">
                Select Category...
              </option>
              <option value="FRUIT">FRUIT</option>
              <option value="VEGTABLE">VEGTABLE</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            label="Expiry date"
            value={form.expiry}
            min={new Date().toISOString().split("T")[0]}
            onChange={e => handleForm("expiry", e.target.value)}
            required
            type={"date"}
            onInvalid={e =>
              e.target.setCustomValidity("We need a name for this.")
            }
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={4} className="d-flex align-items-center">
          <MDBSwitch
            onChange={() => handleForm("isDiscounted", !form.isDiscounted)}
            id="isDiscounted"
            label={form.isDiscounted ? "Discounted" : "Normal price"}
            checked={form.isDiscounted}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="my-3">
        <MDBCol size={4}>
          <MDBInput
            label="Price"
            type="number"
            min={0}
            value={String(form.price)}
            onChange={e => handleForm("price", Number(e.target.value))}
            required
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            label="Discounted"
            type="number"
            min={0}
            max={form.price - 1}
            value={String(form.discounted)}
            onChange={e => handleForm("discounted", Number(e.target.value))}
            required
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            label="Stock"
            type="number"
            value={String(form.stock)}
            className={`${
              form.stock <= 0
                ? "text-danger"
                : form.stock <= 10 && "text-warning"
            }`}
            onChange={e => handleForm("stock", Number(e.target.value))}
            required
            contrast={theme.dark}
          />
        </MDBCol>
      </MDBRow>
      <MDBCol size={8} md={12}>
        <div
          className="bg-image mx-auto hover-overlay"
          style={{ maxWidth: 200 }}
        >
          <img
            id="image"
            src={`${ENDPOINT}/assets/products/${form._id}.jpg`}
            style={{ width: 200, height: 200 }}
            className="img-fluid"
            alt={auth.username}
            onError={e => (e.target.src = PresetUser)}
          />
          <a href="#!">
            <div
              className="mask overlay d-flex align-items-center"
              style={{ backgroundColor: "rgba(57, 192, 237, 0.2)" }}
            >
              <input
                type="file"
                id="uploadProfile"
                style={{ display: "none" }}
                onChange={e => {
                  document.getElementById("image").src = URL.createObjectURL(
                    e.target.files[0]
                  );
                  handleImageChange(e);
                }}
                accept="image/*"
              />
              <MDBBtnGroup className="mx-auto" typeof="button">
                <MDBTooltip
                  wrapperProps={{
                    color: "info",
                    size: "sm",
                    type: "button",
                    onClick: handleChangeProfile,
                  }}
                  title="Upload Producs Picture"
                >
                  <MDBIcon icon="cloud-upload-alt" />
                </MDBTooltip>
              </MDBBtnGroup>
            </div>
          </a>
        </div>
      </MDBCol>
    </>
  );
}
