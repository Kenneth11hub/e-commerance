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
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./form";
import { REVERT, SAVE, UPDATE } from "../../../../../redux/slices/products";
import { UPLOAD } from "../../../../../redux/slices/auth";
import { toast } from "react-toastify";

export default function ProductModal({
  setVisibility,
  visibility,
  data,
  setData,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    { isSuccess } = useSelector(({ products }) => products),
    [form, setForm] = useState({
      expiry: "",
      category: "",
      base64: "",
      name: "",
      price: 0,
      stock: 0,
      description: "",
      discounted: 0,
      isDiscounted: false,
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
        setData({});
      }
      dispatch(REVERT());
      setForm({
        expiry: "",
        category: "",
        base64: "",
        name: "",
        price: 0,
        stock: 0,
        description: "",
        discounted: 0,
        isDiscounted: false,
      });
      setLoading(false);
      if (visibility) {
        toggleShow();
      }
    }
  }, [isSuccess, data, visibility]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    var newObj = { ...form };
    newObj.farmerId = auth._id;
    if (data && data._id) {
      dispatch(
        UPDATE({
          data: newObj,
          id: data._id,
          token,
        })
      );
    } else {
      dispatch(SAVE({ form: newObj, token }));
    }
  };

  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = e => {
      let image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        // setForm({
        //   ...form,
        //   base64: reader.result,
        // });
        handleForm("base64", reader.result.split(",")[1]);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleForm = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} staticBackdrop>
      <MDBModalDialog centered size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Register a product</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <MDBModalBody>
              <ModalForm
                handleImageChange={handleImageChange}
                form={form}
                handleForm={handleForm}
              />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  if (data && data._id) {
                    setData({});
                  }
                  setForm({
                    expiry: "",
                    category: "",
                    base64: "",
                    name: "",
                    price: 0,
                    stock: 0,
                    description: "",
                    discounted: 0,
                    isDiscounted: false,
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
