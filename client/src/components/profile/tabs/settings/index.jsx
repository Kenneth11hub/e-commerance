import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { PresetUser, ENDPOINT, getAge } from "../../../utilities";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE, UPLOAD } from "../../../../redux/slices/auth";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { theme, auth, isLoading, token } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

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

  const handleSubmit = e => {
    e.preventDefault();

    const { fname, mname, lname, address, mobile, dob } = e.target;

    const user = {
      id: auth._id,
      form: {
        fullName: {
          fname: fname.value,
          mname: mname.value,
          lname: lname.value,
        },
        address: address.value,
        dob: dob.value,
        mobile: mobile.value,
      },
    };
    dispatch(UPDATE({ user, token }));
  };

  const handleChangeProfile = () =>
    document.getElementById("uploadProfile").click();

  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = e => {
      let image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        if (this.width === this.height) {
          if (this.width <= 300) {
            dispatch(
              UPLOAD({
                data: {
                  path: `profile`,
                  base64: reader.result.split(",")[1],
                  name: `${auth.email}.jpg`,
                },
                token,
              })
            );
            window.location.reload();
          } else {
            toast.warn("Maximum size is 300 pixels below.");
          }
        } else {
          toast.warn("Proportion must be 1:1");
        }
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <MDBContainer fluid className="px-0">
      <MDBTypography
        tag="h4"
        className={`pb-3 mb-0 border-bottom border-${theme.border}`}
      >
        Update Profile
      </MDBTypography>
      <MDBRow className="mt-3">
        <MDBCol size={4} md={3} className="text-muted">
          <MDBTypography className="mt-3">Avatar</MDBTypography>
        </MDBCol>
        <MDBCol size={8} md={9}>
          <div
            className="bg-image mx-auto hover-overlay"
            style={{ maxWidth: 200 }}
          >
            <img
              src={`${ENDPOINT}/assets/profile/${auth.email}.jpg`}
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
                  onChange={handleImageChange}
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
                    title="Edit Avatar"
                  >
                    <MDBIcon icon="edit" />
                  </MDBTooltip>
                </MDBBtnGroup>
              </div>
            </a>
          </div>
        </MDBCol>
      </MDBRow>
      <form onSubmit={handleSubmit} autoComplete="off">
        <MDBRow className="mt-3">
          <MDBCol size={4} md={3} className="text-muted">
            <MDBTypography className="mt-3">Full Name</MDBTypography>
          </MDBCol>
          <MDBCol size={8} md={9}>
            <MDBRow>
              <MDBCol md={4}>
                <MDBInput
                  type="text"
                  label="First name"
                  key={`${Math.floor(Math.random() * 10)}-fname`}
                  className="my-2"
                  defaultValue={auth.fullName?.fname}
                  contrast={theme.dark}
                  required
                  name="fname"
                />
              </MDBCol>
              <MDBCol md={4}>
                <MDBInput
                  type="text"
                  label="Middle name"
                  className="my-2"
                  contrast={theme.dark}
                  defaultValue={auth?.fullName?.mname}
                  key={`${Math.floor(Math.random() * 10)}-mname`}
                  name="mname"
                />
              </MDBCol>
              <MDBCol md={4}>
                <MDBInput
                  type="text"
                  label="Last name"
                  className="my-2"
                  contrast={theme.dark}
                  defaultValue={auth?.fullName?.lname}
                  key={`${Math.floor(Math.random() * 10)}-lname`}
                  name="lname"
                  required
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3">
          <MDBCol size={4} md={3} className="text-muted">
            <MDBTypography className="mt-3">Full Address</MDBTypography>
          </MDBCol>
          <MDBCol size={8} md={9}>
            <MDBTextArea
              contrast={theme.dark}
              defaultValue={auth?.address}
              label="Full Address"
              name="address"
              key={`${Math.floor(Math.random() * 10)}-address`}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3">
          <MDBCol size={4} md={3} className="text-muted">
            <MDBTypography className="mt-3">Mobile Number</MDBTypography>
          </MDBCol>
          <MDBCol size={8} md={9}>
            <MDBInput
              type="text"
              label="+63"
              className="my-2"
              contrast={theme.dark}
              maxLength={10}
              key={`${Math.floor(Math.random() * 10)}-mobile`}
              onKeyDown={validateContactNumber}
              name="mobile"
              defaultValue={auth?.mobile}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3">
          <MDBCol size={4} md={3} className="text-muted">
            <MDBTypography className="mt-3">Birthday and Age</MDBTypography>
          </MDBCol>
          <MDBCol size={8} md={9}>
            <MDBInput
              type="date"
              label={auth.dob ? `${getAge(auth.dob)} yr(s) old` : "Birthday"}
              key={`${Math.floor(Math.random() * 10)}-dob`}
              className="my-2"
              contrast={theme.dark}
              name="dob"
              defaultValue={auth.dob}
              required
            />
          </MDBCol>
        </MDBRow>

        <div className="text-end mt-3">
          <MDBBtn color="primary" type="submit" disabled={isLoading}>
            {isLoading ? <MDBSpinner grow size="sm" /> : "Update"}
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};

export default ProfileSettings;
