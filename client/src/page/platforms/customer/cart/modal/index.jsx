import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBSwitch,
  MDBBtnGroup,
  MDBTooltip,
  MDBCol,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./form";
import { REVERT, SAVE, UPDATE } from "../../../../../redux/slices/carts";
import {
  ENDPOINT,
  formatCurrency,
  PresetUser,
} from "../../../../../components/utilities";
import Company from "../../../../../fakeDb/company";

export default function TaskModal({
  setVisibility,
  visibility,
  data,
  setData,
  isCod,
  setCod,
  handleImageChange,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { isSuccess } = useSelector(({ carts }) => carts),
    [form, setForm] = useState({
      name: "",
    }),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (data && data._id) {
      setForm(data);
    }
  }, [data]);

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (isSuccess) {
      if (data && data._id) {
        setData([]);
      }
      dispatch(REVERT());
      setForm({
        name: "",
      });
      setLoading(false);
      if (visibility) {
        toggleShow();
      }
    }
  }, [isSuccess, data, visibility]);

  const handleTotal = () => {
    var t = 0;
    if (data.length > 0) {
      data.map(item => {
        t += item.price * item.quantity;
      });
    }
    return t + Company.delivery;
  };
  const handleChangeProfile = () =>
    document.getElementById("uploadProfile").click();

  return (
    <MDBModal tabIndex="-1" show={visibility} staticBackdrop>
      <MDBModalDialog centered>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Check Out</MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody className="d-flex align-items-center justify-content-center">
            <MDBTable align="middle" hover responsive color={theme.color}>
              <MDBTableHead>
                <tr className="text-center">
                  <th scope="col" className="text-start">
                    Product
                  </th>
                  <th scope="col" className="text-start">
                    Price
                  </th>
                  <th scope="col">Quantity</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data.map((item, index) => (
                  <ModalForm key={`tasks-${index}`} item={item} index={index} />
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBModalBody>
          <MDBModalFooter className="py-0">
            <MDBTypography tag={"h3"} className="me-2 text-success">
              Delivery fee: {Company.delivery}
            </MDBTypography>
            {!isCod && (
              <MDBCol size={12}>
                <h3>
                  Please send exact amount to this number {Company.contact}. The
                  total amount is {formatCurrency(handleTotal())}
                </h3>
                <br />
                <br />
                <h4>Reminder: This transaction is not Refundable.</h4>
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
                        required
                        type="file"
                        id="uploadProfile"
                        style={{ display: "none" }}
                        onChange={e => {
                          document.getElementById("image").src =
                            URL.createObjectURL(e.target.files[0]);
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
                          title={`Upload Recip from gcash to verify total of ${formatCurrency(
                            handleTotal()
                          )}`}
                        >
                          <MDBIcon icon="cloud-upload-alt" />
                        </MDBTooltip>
                      </MDBBtnGroup>
                    </div>
                  </a>
                </div>
              </MDBCol>
            )}
            <MDBSwitch
              onChange={() => setCod(!isCod)}
              id="isCod"
              label={isCod ? "COD" : "Gcash"}
            />
            <MDBBtn
              type="button"
              className="shadow-0"
              color={theme.color}
              onClick={() => {
                if (data && data._id) {
                  setData([]);
                }
                setForm([]);
                toggleShow();
              }}
              disabled={loading}
            >
              Close
            </MDBBtn>
            <MDBBtn color="success" type="submit" disabled={loading}>
              {loading ? (
                <MDBSpinner size="sm" grow />
              ) : (
                formatCurrency(handleTotal())
              )}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
