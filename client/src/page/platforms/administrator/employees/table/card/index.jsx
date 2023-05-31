import React from "react";
import { MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import {
  formatCurrency,
  fullMobile,
  fullName,
  getAge,
} from "../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, UPDATE } from "../../../../../../redux/slices/users";
import { useParams } from "react-router-dom";

export default function TableCard({ item, setData }) {
  const { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    { type } = useParams();

  const handleArchives = () => {
    const action = item.deletedAt ? "unlock" : "lock";

    Swal.fire({
      icon: "question",
      title: `Do you want to ${action} this?`,
      html: "A locked account cannot be logged in.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (item.deletedAt) {
          dispatch(
            UPDATE({
              data: { deletedAt: "" },
              id: item._id,
              token,
            })
          );
        } else {
          dispatch(DESTROY({ id: item._id, token }));
        }
      }
    });
  };

  const handleSales = item =>
    window.open(
      `/sales/${item._id}/print`,
      "Sales",
      "top=100px,width=768px,height=650px"
    );

  return (
    <tr className="text-center">
      <td className="text-start">
        <p className="fw-bold mb-1 text-capitalize">
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title={item.isMale ? "Male" : "Female"}
          >
            <MDBIcon
              className="me-1"
              color={item.isMale ? "primary" : "danger"}
              icon={item.isMale ? "male" : "female"}
            />
          </MDBTooltip>
          {fullName(item.fullName)} {item.nickname && `(${item.nickname})`}
        </p>
        <p className="text-muted mb-0">
          {new Date(item.dob).toDateString()},&nbsp;{getAge(item.dob)}yrs old
        </p>
      </td>
      <td>
        <p className="fw-bold mb-1">{item.email}</p>
        <p className="text-muted mb-0">{fullMobile(item.mobile)}</p>
      </td>

      <td className="text-center">
        {type === "farmer" && (
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title="View Sales"
          >
            <MDBBtn onClick={() => handleSales(item)} size="sm" color="info">
              <MDBIcon icon="clipboard-list" />
            </MDBBtn>
          </MDBTooltip>
        )}
        <MDBTooltip
          title="Update user!"
          tag="span"
          wrapperClass="d-inline-block"
        >
          <MDBBtn onClick={() => setData(item)} size="sm" color="primary">
            <MDBIcon icon="pen" />
          </MDBBtn>
        </MDBTooltip>
        <MDBTooltip
          tag="span"
          wrapperClass="d-inline-block"
          title={`${item.deletedAt ? "Unlock" : "Lock"} account!`}
        >
          <MDBBtn
            size="sm"
            color={item.deletedAt ? "primary" : "warning"}
            onClick={handleArchives}
          >
            <MDBIcon icon={`${item.deletedAt ? "lock-open" : "lock"}`} />
          </MDBBtn>
        </MDBTooltip>
      </td>
    </tr>
  );
}
