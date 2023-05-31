import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBNavbarItem,
  MDBBadge,
  MDBCol,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import NotificationCard from "./card";
import { FIND } from "../../../redux/slices/notifications";

const NavbarNotifications = () => {
  const [visibility, setVisibility] = useState(false),
    { auth, theme, token } = useSelector(state => state.auth),
    { catalogs } = useSelector(({ notifications }) => notifications),
    [notifications, setNotifications] = useState([]),
    [notify, setNotify] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth._id) {
      dispatch(FIND({ id: auth._id, token }));
    }
  }, [auth]);

  useEffect(() => {
    setNotify(false);
    if (catalogs.length > 0) {
      const notify = catalogs.find(catalog => !catalog.isRead);
      if (notify) {
        setNotify(true);
      }
      var newArr = [...catalogs];

      newArr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      setNotifications(
        newArr.sort((a, b) => Number(a.isRead) - Number(b.isRead))
      );
    }
  }, [catalogs]);

  return (
    <>
      <MDBNavbarItem className={theme.text}>
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title="Notifications"
        >
          <MDBBtn
            onClick={setVisibility}
            value={true}
            size="sm"
            color="transparent"
            className="shadow-0"
          >
            <MDBIcon icon="bell" size="lg" className="custom-navbar-icon" />
            {notify && <MDBBadge color="primary" className="mb-1" dot />}
          </MDBBtn>
        </MDBTooltip>
      </MDBNavbarItem>

      <MDBCol
        className={`custom-notification-modal ${theme.bg} ${
          visibility && "notification-modal-active"
        }`}
        style={{
          width:
            window.innerWidth > 1400
              ? "30%"
              : window.innerWidth > 1200
              ? "40%"
              : window.innerWidth > 1000
              ? "50%"
              : window.innerWidth > 800
              ? "60%"
              : window.innerWidth > 600
              ? "75%"
              : "100%",
        }}
      >
        <MDBCol className="d-flex align-items-center justify-content-between px-3 py-3">
          <h4 className={`font-poppins fw-bold h4 h4-responsive ${theme.text}`}>
            Notifications
          </h4>
          <MDBIcon
            onClick={() => setVisibility(!visibility)}
            icon="times"
            size="1x"
            className={`custom-notification-close p-3 cursor-pointer ${theme.text}`}
          />
        </MDBCol>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <NotificationCard
            notification={{
              content: "No available notification",
              icon: "heart-broken",
              createdAt: new Date(),
              isRead: true,
            }}
          />
        )}
      </MDBCol>
      <MDBCol
        className={`custom-notification-overlay ${
          visibility && "custom-notification-overlay-active"
        }`}
        onClick={() => setVisibility(!visibility)}
      ></MDBCol>
    </>
  );
};

export default NavbarNotifications;
