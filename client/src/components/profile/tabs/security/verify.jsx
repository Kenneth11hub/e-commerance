import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../redux/slices/auth";
import Company from "../../../../fakeDb/company";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [code, setCode] = useState(0),
    [loading, setLoading] = useState(false),
    { token, auth, theme } = useSelector(state => state.auth),
    dispatch = useDispatch();

  const validateContactNumber = e => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 58) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      e.keyCode === 8
    ) {
      return true;
    } else {
      e.preventDefault();
    }
  };

  const handleRandomNumber = () => Math.floor(Math.random() * 100000) + 900000;

  const handleVerification = async () => {
    setLoading(true);
    let code = handleRandomNumber();
    setCode(code);
    const emailData = {
      to: auth.email,
      username: auth.username,
      subject: `${Company.name} Email Verification`,
      message: `Please use the code below in ${Company.name} Website to verify your email`,
      code,
    };

    await axios
      .post(`/mailer/code`, emailData)
      .then(() => {
        toggleShow();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleVerify = e => {
    e.preventDefault();

    if (code === parseInt(e.target.code.value)) {
      dispatch(
        UPDATE({
          user: {
            id: auth._id,
            form: {
              verified: true,
            },
          },
          token,
        })
      );
      setLoading(false);
      toggleShow();
    } else {
      toast.warn("Invalid code!");
    }
  };

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBBtn
        color={auth.verified ? "success" : "primary"}
        disabled={auth.verified || loading}
        onClick={handleVerification}
      >
        {auth.verified ? (
          <MDBIcon icon="check" />
        ) : loading ? (
          <MDBSpinner grow size="sm" />
        ) : (
          "Verify"
        )}
      </MDBBtn>

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={centredModal}
        setShow={setCentredModal}
      >
        <MDBModalDialog centered>
          <form onSubmit={handleVerify}>
            <MDBModalContent
              className={`${theme.text} ${theme.bg} font-poppins`}
            >
              <MDBModalHeader>
                <MDBModalTitle className="fs-5 fw-bold">
                  Email Verification
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <p>
                  A code has been sent to your email. Please enter the code
                  below to verify your email.
                </p>
                <MDBInput
                  type="text"
                  label={<span className={theme.text}>Enter 6 Digit Code</span>}
                  className={`${theme.text} my-2`}
                  required
                  name="code"
                  onKeyDown={validateContactNumber}
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn type="button" color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Verify</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EmailVerification;
