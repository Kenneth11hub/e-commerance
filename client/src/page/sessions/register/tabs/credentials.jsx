import React from "react";
import { MDBCol, MDBRow, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Credentials({ setActiveIndex, form, setForm }) {
  const { theme } = useSelector(({ auth }) => auth);

  const handleSubmit = e => {
    e.preventDefault();

    const { email, username, password, cpassword } = e.target;

    if (password.value === cpassword.value) {
      if (password.value.length >= 8) {
        setForm({
          ...form,
          email: email.value,
          username: username.value,
          password: password.value,
        });
        setActiveIndex(2);
      } else {
        toast.warn("Password must be at least 8 letters!");
      }
    } else {
      toast.warn("Passwords does not match!");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <MDBRow>
        <MDBCol size={12}>
          <MDBInput
            type="email"
            label="E-mail Address"
            name="email"
            contrast={theme.dark}
            defaultValue={form?.email}
            required
          />
        </MDBCol>
        <MDBCol size={12}>
          <MDBInput
            type="text"
            label="Username (Optional)"
            name="username"
            className="my-3"
            contrast={theme.dark}
            defaultValue={form?.username}
          />
        </MDBCol>
        <MDBCol size={12}>
          <MDBInput
            type="password"
            label="Password"
            name="password"
            className="mb-3"
            contrast={theme.dark}
            required
          />
        </MDBCol>
        <MDBCol size={12}>
          <MDBInput
            type="password"
            label="Confirm Password"
            name="cpassword"
            contrast={theme.dark}
            required
          />
        </MDBCol>
      </MDBRow>
      <div className="mt-3 d-flex justify-content-between">
        <MDBBtn
          onClick={() => setActiveIndex(0)}
          className="shadow-0"
          type="button"
          color={theme.color}
        >
          Return
        </MDBBtn>
        <MDBBtn type="submit" color="info">
          Proceed
        </MDBBtn>
      </div>
    </form>
  );
}
