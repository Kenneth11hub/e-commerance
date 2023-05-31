import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBSwitch,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function ModalForm({
  form,
  handleForm,
  fullName,
  handleFullName,
  visibility,
}) {
  const { theme } = useSelector(({ auth }) => auth),
    [isFamer, setIsFarmer] = useState(false);

  useEffect(() => {
    form?.role?.name === "farmer" ? setIsFarmer(true) : setIsFarmer(false);
  }, [visibility]);

  const handleRole = async v => {
    var farmer = {
      name: "farmer",
      display_name: "Farmer",
    };
    var user = {
      name: "user",
      display_name: "User",
    };
    if (v) {
      await handleForm("role", farmer);
    } else {
      await handleForm("role", user);
    }
    await setIsFarmer(v);
    console.log(form.role);
  };

  return (
    <>
      <MDBRow>
        <MDBCol size={3}>
          <MDBInput
            label="First name"
            value={fullName.fname}
            onChange={e => handleFullName("fname", e.target.value)}
            required
            onInvalid={e =>
              e.target.setCustomValidity("Surely they have a First name.")
            }
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={3}>
          <MDBInput
            label="Middle name (Optional)"
            value={fullName.mname}
            onChange={e => handleFullName("mname", e.target.value)}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={3}>
          <MDBInput
            label="Last name"
            value={fullName.lname}
            onChange={e => handleFullName("lname", e.target.value)}
            required
            onInvalid={e =>
              e.target.setCustomValidity("Everyone has a Last name.")
            }
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={3}>
          <MDBInputGroup textBefore={<span className={theme.text}>EXT</span>}>
            <select
              value={fullName.suffix}
              onChange={e => handleFullName("suffix", e.target.value)}
              className={`form-control ${theme.bg} ${theme.text}`}
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
      </MDBRow>
      <MDBRow className="my-3">
        <MDBCol size={4}>
          <MDBInput
            label="Nickname (Optional)"
            value={form.nickname}
            onChange={e => handleForm("nickname", e.target.value)}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={4}>
          <MDBInput
            label="Date of Birth"
            value={form.dob}
            type="date"
            onChange={e => handleForm("dob", e.target.value)}
            required
            onInvalid={e =>
              e.target.setCustomValidity("How can we celebrate their birthday?")
            }
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={2} className="d-flex align-items-center">
          <MDBSwitch
            onChange={() => handleForm("isMale", !form.isMale)}
            id="isMale"
            label={form.isMale ? "Male" : "Female"}
            checked={form.isMale}
          />
        </MDBCol>
        <MDBCol size={2} className="text-start d-flex align-items-center">
          <MDBSwitch
            onChange={() => handleRole(!isFamer)}
            id="isFamer"
            label={isFamer ? "Farmer" : "User"}
            checked={isFamer}
          />
        </MDBCol>
      </MDBRow>
      <MDBCol size={12}>
        <MDBTextArea
          label="Full Address"
          value={form.address}
          onChange={e => handleForm("address", e.target.value)}
          onInvalid={e =>
            e.target.setCustomValidity(
              "How can we visit them on their birthday?"
            )
          }
          onInput={e => e.target.setCustomValidity("")}
          required
          contrast={theme.dark}
        />
      </MDBCol>
      <MDBRow className="my-3">
        <MDBCol size={6}>
          <MDBInput
            type="email"
            label="E-mail Address"
            value={form.email}
            required
            onChange={e => handleForm("email", e.target.value)}
            onInvalid={e => e.target.setCustomValidity("Any email will do.")}
            onInput={e => e.target.setCustomValidity("")}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6}>
          <MDBInput
            label="Mobile (Optional)"
            value={form.mobile}
            onChange={e => handleForm("mobile", e.target.value)}
            contrast={theme.dark}
          />
        </MDBCol>
      </MDBRow>
    </>
  );
}
