import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBSpinner,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { CHANGEPASSWORD, RESET, UPDATE } from "../../../../redux/slices/auth";
import { toast } from "react-toastify";
// import EmailVerification from "./verify";
import { useNavigate } from "react-router-dom";

const ProfileSecurity = () => {
  const [show, setShow] = useState({
      old: false,
      new: false,
      confirm: false,
    }),
    dispatch = useDispatch(),
    { isLoading, theme, auth, token, didChange } = useSelector(
      ({ auth }) => auth
    ),
    navigate = useNavigate();

  useEffect(() => {
    if (didChange) {
      dispatch(RESET());
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [didChange, dispatch, navigate]);

  const handleChangePassword = e => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = e.target;

    if (oldPassword.value === newPassword.value) {
      toast.warn("Old password cannot be the same with new password!");
    } else {
      if (newPassword.value !== confirmPassword.value) {
        toast.warn("New passwords does not match!");
      } else {
        const form = {
          email: auth.email,
          oldPassword: oldPassword.value,
          password: newPassword.value,
        };
        dispatch(CHANGEPASSWORD({ form, token }));
      }
    }
  };

  const handleEmail = e => {
    e.preventDefault();

    const { email } = e.target;

    if (email.value === auth.email) {
      toast.warn("Cannot update same email.");
    } else {
      const user = {
        id: auth._id,
        form: { email: email.value },
      };
      dispatch(UPDATE({ user, token }));
    }
  };

  return (
    <MDBContainer>
      <MDBTypography
        tag="h4"
        className={`pb-3 mb-0 border-bottom border-${theme.border}`}
      >
        Security
      </MDBTypography>
      <MDBRow className="mt-3">
        <MDBCol size={2} md={3} className="text-muted">
          <MDBTypography className="mt-3">E-mail Address</MDBTypography>
        </MDBCol>
        <MDBCol size={10} md={9}>
          <form onSubmit={handleEmail}>
            <MDBInputGroup className="my-2">
              <input
                className={`form-control bg-transparent ${theme.text}`}
                type="email"
                defaultValue={auth.email}
                name="email"
                required
              />
              <MDBBtn
                type="submit"
                color="primary"
                // disabled={auth.verified || loading}
              >
                update
              </MDBBtn>

              {/* <EmailVerification /> */}
            </MDBInputGroup>
          </form>
        </MDBCol>
      </MDBRow>
      <form onSubmit={handleChangePassword} id="form-reset">
        <MDBRow className="mt-3">
          <MDBCol size={2} md={3} className="text-muted">
            <MDBTypography className="mt-3">Change Password</MDBTypography>
          </MDBCol>
          <MDBCol size={10} md={9} className="text-end">
            <MDBRow>
              <MDBCol md={12} className="position-relative">
                <MDBInput
                  type={show.old ? "text" : "password"}
                  label="Current Password"
                  className="my-2"
                  contrast={theme.dark}
                  required
                  name="oldPassword"
                  minLength={6}
                />
                <MDBIcon
                  icon={show.old ? "eye" : "eye-slash"}
                  className="custom-security-eye cursor-pointer"
                  onMouseOver={() => setShow({ ...show, old: true })}
                  onMouseOut={() => setShow({ ...show, old: false })}
                />
              </MDBCol>
              <MDBCol md={6} className="position-relative">
                <MDBInput
                  type={show.new ? "text" : "password"}
                  label="New Password"
                  className="my-2"
                  contrast={theme.dark}
                  required
                  name="newPassword"
                  minLength={6}
                />
                <MDBIcon
                  icon={show.new ? "eye" : "eye-slash"}
                  className="custom-security-eye cursor-pointer"
                  onMouseOver={() => setShow({ ...show, new: true })}
                  onMouseOut={() => setShow({ ...show, new: false })}
                />
              </MDBCol>
              <MDBCol md={6} className="position-relative">
                <MDBInput
                  type={show.confirm ? "text" : "password"}
                  label="Confirm New Password"
                  className="my-2"
                  contrast={theme.dark}
                  required
                  name="confirmPassword"
                  minLength={6}
                />
                <MDBIcon
                  icon={show.confirm ? "eye" : "eye-slash"}
                  className="custom-security-eye cursor-pointer"
                  onMouseOver={() => setShow({ ...show, confirm: true })}
                  onMouseOut={() => setShow({ ...show, confirm: false })}
                />
              </MDBCol>
            </MDBRow>
            <MDBBtn
              type="submit"
              color="primary"
              className="my-2"
              disabled={isLoading}
            >
              {isLoading ? <MDBSpinner grow size="sm" /> : "Submit"}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
};

export default ProfileSecurity;
