import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBInputGroup,
  MDBTextArea,
  MDBSwitch,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAge,
  validateContactNumber,
} from "../../../../components/utilities";

export default function BasicInfo({ setActiveIndex, form, setForm }) {
  const { theme } = useSelector(({ auth }) => auth),
    [age, setAge] = useState(""),
    [isMale, setIsMale] = useState(true),
    [isFamer, setIsFarmer] = useState(false),
    navigate = useNavigate();

  useEffect(() => {
    if (form.dob) {
      var ageInMilliseconds = new Date() - new Date(form.dob);
      setAge(Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365));
    }
  }, [form]);

  const handleSubmit = e => {
    e.preventDefault();

    if (age >= 18 && age <= 90) {
      const { fname, mname, lname, suffix, address, mobile, dob } = e.target;

      const fullName = {
        fname: fname.value,
        mname: mname.value,
        lname: lname.value,
        suffix: suffix.value,
      };
      var farmer = {
        name: "farmer",
        display_name: "Farmer",
      };
      var user = {
        name: "customer",
        display_name: "Customer",
      };

      setForm({
        ...form,
        fullName,
        address: address.value,
        mobile: mobile.value,
        dob: dob.value,
        isMale,
        role: isFamer ? farmer : user,
      });
      setActiveIndex(1);
    } else {
      toast.warn("Age is inappropriate!");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <MDBRow>
        <MDBCol md={3}>
          <MDBInput
            type="text"
            label="First name"
            name="fname"
            contrast={theme.dark}
            defaultValue={form?.fullName?.fname}
            required
          />
        </MDBCol>
        <MDBCol md={3}>
          <MDBInput
            type="text"
            label="Middle name (Optional)"
            name="mname"
            contrast={theme.dark}
            defaultValue={form?.fullName?.mname}
          />
        </MDBCol>
        <MDBCol md={3}>
          <MDBInput
            type="text"
            label="Last name"
            name="lname"
            contrast={theme.dark}
            defaultValue={form?.fullName?.lname}
            required
          />
        </MDBCol>
        <MDBCol md={3}>
          <MDBInputGroup textBefore={<span className={theme.text}>EXT</span>}>
            <select
              defaultValue={form?.fullName?.suffix}
              className={`form-control ${theme.bg} ${theme.text}`}
              name="suffix"
            >
              <option value="NONE">NONE</option>
              <option value="JR">JR</option>
              <option value="SR">SR</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={12} className="mb-1 mt-2 mb-md-3">
          <MDBTextArea
            label="Address"
            name="address"
            defaultValue={form?.address}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            type="text"
            label="Contact Number (+63)"
            name="mobile"
            contrast={theme.dark}
            maxLength={10}
            onKeyDown={validateContactNumber}
            defaultValue={form?.mobile}
            required
          />
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            type="date"
            label={age ? `${age} years old` : "Birthday"}
            name="dob"
            contrast={theme.dark}
            defaultValue={form?.dob}
            onChange={e => setAge(getAge(e.target.value))}
            required
          />
        </MDBCol>
        <MDBCol size={2} className="text-start d-flex align-items-center">
          <MDBSwitch
            onChange={() => setIsMale(!isMale)}
            id="isMale"
            label={isMale ? "Male" : "Female"}
          />
        </MDBCol>
        <MDBCol size={2} className="text-start d-flex align-items-center">
          <MDBSwitch
            onChange={() => setIsFarmer(!isFamer)}
            id="isFamer"
            label={isFamer ? "Farmer" : "Customer"}
          />
        </MDBCol>
      </MDBRow>
      <div className="mt-3 d-flex justify-content-between">
        <MDBBtn
          onClick={() => navigate("/login")}
          className="shadow-0"
          type="button"
          color={theme.color}
        >
          Already have an account?
        </MDBBtn>
        <MDBBtn type="submit" color="info">
          Proceed
        </MDBBtn>
      </div>
    </form>
  );
}
