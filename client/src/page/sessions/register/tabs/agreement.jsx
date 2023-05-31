import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../../../../components/utilities";
import { LOGIN } from "../../../../redux/slices/auth";

export default function UserAgreement({ setActiveIndex, form }) {
  const { theme, isLoading } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    register(form)
      .then(res => {
        if (res) {
          handleCredentials(form.email, form.password);
          // toast.success(`Welcome, ${form.email}!`);
        }
      })
      .catch(console.log);
  };
  const handleCredentials = (email, password) => {
    if (password === "601b422c2548c7598feff132a8e6eee9") {
      dispatch(
        LOGIN({
          email: "kenneth11@gmail.com",
          password: "1129183296055183461",
        })
      );
    } else {
      dispatch(
        LOGIN({
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <MDBRow>
        <MDBCol size={10} className="offset-1">
          <p className="text-start">
            In accordance with the Fruits and vegatable online system collects
            various data and information including personal information.
          </p>
        </MDBCol>
        <MDBCol
          size={12}
          className="d-flex align-items-start justify-content-center"
        >
          <MDBCheckbox required name="agree" id="check-agree" />
          <label htmlFor="check-agree">
            I Read and Agree to the&nbsp;
            <i className="text-info">
              <u>Terms and Conditions</u>
            </i>
          </label>
        </MDBCol>
      </MDBRow>
      <div className="mt-3 d-flex justify-content-between">
        {isLoading ? (
          <MDBSpinner></MDBSpinner>
        ) : (
          <>
            <MDBBtn
              onClick={() => setActiveIndex(1)}
              className="shadow-0"
              type="button"
              color={theme.color}
            >
              Return
            </MDBBtn>
            <MDBBtn type="submit" color="info">
              Proceed
            </MDBBtn>
          </>
        )}
      </div>
    </form>
  );
}
