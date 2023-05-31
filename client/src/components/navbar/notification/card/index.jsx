import React from "react";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../../../redux/slices/notifications";

const NotificationCard = ({ notification }) => {
  const { theme, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleRead = () => {
    if (!notification.isRead) {
      dispatch(
        UPDATE({
          data: {
            isRead: true,
          },
          id: notification._id,
          token,
        })
      );
    }
  };

  return (
    <MDBCol
      onClick={handleRead}
      className={`custom-notification-container position-relative pb-4 mx-5 ${
        !notification.isRead && "cursor-pointer"
      }`}
    >
      <MDBIcon
        icon={notification.icon}
        size="lg"
        className={`custom-notification-icon ${
          !notification.isRead && `bg-${notification.color}`
        }`}
      />
      <MDBContainer className="ms-5 p-0">
        <h6
          className={`h6 h6-responsive custom-notification-title fw-bold p-0 w-0 ${theme.text}`}
        >
          {notification.content}
        </h6>
        <p className={`custom-notification-label p-0 w-0 ${theme.text}`}>
          {new Date(notification.createdAt).toDateString()}
        </p>
      </MDBContainer>
    </MDBCol>
  );
};

export default NotificationCard;
