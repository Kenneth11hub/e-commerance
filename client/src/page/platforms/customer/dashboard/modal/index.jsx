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
  MDBSwitch,
  MDBBtnGroup,
  MDBTooltip,
  MDBIcon,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./form";
import { REVERT, SAVE } from "../../../../../redux/slices/carts";
import { ENDPOINT, PresetUser } from "../../../../../components/utilities";
import { SAVE as SAVE_SALES } from "../../../../../redux/slices/sales";

export default function ProductModal({
  setVisibility,
  visibility,
  data,
  setData,
  isBuy,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { isSuccess } = useSelector(({ products }) => products),
    [form, setForm] = useState({
      quantity: 1,
    }),
    [loading, setLoading] = useState(false),
    [isCod, setCod] = useState(true),
    [pic, setPic] = useState(""),
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
        setData({
          quantity: 1,
        });
      }
      dispatch(REVERT());
      setForm({
        quantity: 1,
      });
      setLoading(false);
      if (visibility) {
        toggleShow();
      }
    }
  }, [isSuccess, data, visibility]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isBuy) {
      var products = [
        {
          farmerId: data.farmerId,
          productId: data._id,
          isOrdered: false,
          quantity: form.quantity,
          price: data.isDiscounted ? data.discounted : data.price,
        },
      ];
      var obj = {
        products,
        userId: auth._id,
        total:
          (data.isDiscounted ? data.discounted : data.price) * form.quantity,
        base64: pic,
        isCod: isCod,
        status: "ordered",
      };
      dispatch(SAVE_SALES({ form: obj, token }));
    } else {
      var newObj = {};
      newObj.userId = auth._id;
      newObj.productId = data._id;
      newObj.quantity = data.quantity;
      newObj.isOrdered = false;
      newObj.quantity = form.quantity;
      newObj.stock = form.stock;

      dispatch(SAVE({ form: newObj, token }));
    }
    toggleShow();
    setLoading(false);
  };

  const handleForm = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        setPic(reader.result.split(",")[1]);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleChangeProfile = () =>
    document.getElementById("uploadProfile").click();

  return (
    <MDBModal tabIndex="-1" show={visibility} staticBackdrop>
      <MDBModalDialog centered size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>{data.name}</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <MDBModalBody>
              <ModalForm form={form} handleForm={handleForm} />
              {!isCod && (
                <MDBCol size={12}>
                  <div
                    className="bg-image mx-auto hover-overlay"
                    style={{ maxWidth: 200 }}
                  >
                    <img
                      id="image"
                      style={{ width: 200, height: 200 }}
                      src={`${ENDPOINT}/assets/products/${form._id}.jpg`}
                      className="img-fluid"
                      alt={auth.username}
                      onError={(e) => (e.target.src = PresetUser)}
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
                          onChange={(e) => {
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
                            title="Upload Gcash receipt to verify"
                          >
                            <MDBIcon icon="cloud-upload-alt" />
                          </MDBTooltip>
                        </MDBBtnGroup>
                      </div>
                    </a>
                  </div>
                </MDBCol>
              )}
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              {isBuy && (
                <MDBSwitch
                  onChange={() => setCod(!isCod)}
                  id="isCod"
                  label={isCod ? "COD" : "Gcash"}
                />
              )}
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  if (data && data._id) {
                    setData({
                      quantity: 1,
                    });
                  }
                  setForm({
                    quantity: 1,
                  });
                  toggleShow();
                }}
                disabled={loading}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit" disabled={loading}>
                {loading ? <MDBSpinner size="sm" grow /> : "Submit"}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
