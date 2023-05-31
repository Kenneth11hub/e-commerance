import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBNavbarItem,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import { PresetUser, ENDPOINT } from "../../utilities";
import { useSelector } from "react-redux";
import axios from "axios";

const NavbarProfile = () => {
  const [visibility, setVisibility] = useState(false),
    [items, setItems] = useState([]),
    { auth, theme, token } = useSelector(state => state.auth),
    navigate = useNavigate();

  useEffect(() => {
    if (auth._id) {
      setItems([
        {
          name: auth.nickname || "My Profile",
          icon: "user-circle",
          path: `${auth.role.name}/profile`,
        },
      ]);
    }
  }, [auth]);

  const handleLogout = () => {
    console.log(auth._id);
    axios
      .get(`attendances/${auth._id}/logout`, {
        headers: {
          Authorization: `QTracy ${token}`,
        },
      })
      .then(() => {
        toast.info("Removing all your cache.");
        setVisibility(false);
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 5100);
      })
      .catch(err => {
        toast.error(err.response.data.error);
      });
  };

  const handleEvent = e => e.target.id !== "my-profile" && setVisibility(false);

  useEffect(() => {
    window.addEventListener("click", handleEvent);
    return () => window.removeEventListener("click", handleEvent);
  }, []);

  return (
    <MDBNavbarItem className={`${theme.text} me-3`}>
      <div className="dropdown">
        <MDBBtn
          className="p-0 mx-2 dropbtn"
          onClick={() => setVisibility(!visibility)}
        >
          <img
            id="my-profile"
            src={`${ENDPOINT}/assets/profile/${auth.email}.jpg`}
            alt={auth?.username}
            height={28}
            width={28}
            onError={e => (e.target.src = PresetUser)}
          />
        </MDBBtn>
        <div
          className={`custom-dropdown-content ${
            visibility ? "d-block" : "d-none"
          }`}
          style={{ backgroundColor: theme.bgHex }}
        >
          <MDBListGroup>
            {items.map((item, index) => (
              <MDBRipple
                key={`profile-item-${index}`}
                rippleTag="span"
                rippleColor={theme.border}
              >
                <MDBListGroupItem
                  onClick={() => {
                    setVisibility(!visibility);
                    navigate(item.path);
                  }}
                  action
                  color={theme.color}
                  className={`cursor-pointer text-capitalize border-0`}
                >
                  <MDBIcon icon={item.icon} />
                  &nbsp;
                  {item.name}
                </MDBListGroupItem>
              </MDBRipple>
            ))}

            <MDBRipple rippleTag="span" rippleColor={theme.border}>
              <MDBListGroupItem
                onClick={handleLogout}
                color={theme.color}
                action
                className="cursor-pointer border-0"
              >
                <MDBIcon icon="sign-out-alt" />
                &nbsp;Logout
              </MDBListGroupItem>
            </MDBRipple>
          </MDBListGroup>
        </div>
      </div>
    </MDBNavbarItem>
  );
};

export default NavbarProfile;
