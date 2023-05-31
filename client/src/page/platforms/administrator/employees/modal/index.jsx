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
import { REVERT, SAVE, UPDATE } from "../../../../../redux/slices/users";
import { SAVE as NOTIFY } from "../../../../../redux/slices/notifications";

export default function ProductModal({
  setVisibility,
  visibility,
  data,
  setData,
}) {
  const { theme, token } = useSelector(({ auth }) => auth),
    { isSuccess } = useSelector(({ users }) => users),
    [fullName, setFullName] = useState({
      role: {},
      fname: "",
      mname: "",
      lname: "",
      suffix: "",
    }),
    [form, setForm] = useState({
      role: {},
      nickname: "",
      dob: "",
      isMale: true,
      address: "",
      email: "",
      mobile: "",
      rate: 0,
    }),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (data && data._id) {
      setForm(data);
      setFullName(data.fullName);
    }
  }, [data]);

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (isSuccess) {
      if (data && data._id) {
        setData({});
      }
      dispatch(REVERT());
      setFullName({
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      });
      setForm({
        role: {},
        nickname: "",
        dob: "",
        isMale: true,
        address: "",
        email: "",
        mobile: "",
        rate: 0,
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

    const newObj = { ...form };
    newObj.fullName = fullName;

    if (data && data._id) {
      if (newObj.rate !== data.rate) {
        dispatch(
          NOTIFY({
            form: {
              userId: data._id,
              content: `Hourly rate changed from ${data.rate} to ${newObj.rate}`,
              icon:
                data.rate > newObj.rate
                  ? "angle-double-down"
                  : "angle-double-up",
              color: data.rate > newObj.rate ? "danger" : "success",
            },
            token,
          })
        );
      }
      console.log(newObj);
      dispatch(
        UPDATE({
          data: newObj,
          id: data._id,
          token,
        })
      );
    } else {
      newObj.password = "password";
      newObj.role = {
        name: "cashier",
        display_name: "Cashier",
      };
      dispatch(SAVE({ form: newObj, token }));
    }
  };

  const handleForm = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFullName = (name, value) => {
    setFullName({
      ...fullName,
      [name]: value,
    });
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} staticBackdrop>
      <MDBModalDialog centered size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Register an employee</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <MDBModalBody>
              <ModalForm
                visibility={visibility}
                form={form}
                handleForm={handleForm}
                fullName={fullName}
                handleFullName={handleFullName}
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
                  setFullName({
                    fname: "",
                    mname: "",
                    lname: "",
                    suffix: "",
                  });
                  setForm({
                    role: {},
                    nickname: "",
                    dob: "",
                    isMale: true,
                    address: "",
                    email: "",
                    mobile: "",
                    rate: 0,
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
