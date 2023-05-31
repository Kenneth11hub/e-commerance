import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, UPDATE } from "../../../../../../redux/slices/carts";
import {
  ENDPOINT,
  formatCurrency,
  fullName,
  PresetUser,
} from "../../../../../../components/utilities";

export default function TableCard({ item, setData, setIsBuy }) {
  const { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleArchives = () =>
    Swal.fire({
      icon: "question",
      title: `Do you want to archive this?`,
      html: item.name,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(DESTROY({ id: item._id, token }));
      }
    });

  const handleMark = () =>
    dispatch(
      UPDATE({
        data: { isComplete: true },
        id: item._id,
        token,
      })
    );

  const handleStocks = () => {
    let color = "primary",
      message = "Plenty";

    if (item.stock <= 0) {
      color = "danger";
      message = "Depleted";
    } else if (item.stock <= 10) {
      color = "warning";
      message = "Low";
    }
    return (
      <MDBTooltip tag="span" wrapperClass="d-inline-block" title={message}>
        <MDBBadge color={color}>Stock: {item.stock}</MDBBadge>
      </MDBTooltip>
    );
  };

  return (
    <>
      <MDBCol lg={3} sm={12} md={12} className="my-3">
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage
              className="img-fluid"
              style={{ height: "300px", width: "300px", objectFit: "cover" }}
              src={`${ENDPOINT}/assets/products/${item._id}.jpg`}
              fluid
              alt="..."
              onError={e => (e.target.src = PresetUser)}
            />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle tag={"h1"}>{item.name}</MDBCardTitle>
            <p className="mb-0">
              {handleStocks()}
              {item.stock < 0 && (
                <MDBTooltip
                  tag="span"
                  wrapperClass="d-inline-block"
                  title="This appears when a negative number is in stock, meaning the previous stated stock was wrong."
                >
                  <MDBBadge color="info">
                    <MDBIcon icon="info" />
                  </MDBBadge>
                </MDBTooltip>
              )}
            </p>
            <MDBCardText tag={"h6"}>Farmer:</MDBCardText>
            <div className="d-flex align-items-center">
              <img
                src={`${ENDPOINT}/assets/profile/${item?.farmerId?.email}.jpg`}
                style={{ width: 50, height: 50 }}
                className="img-fluid rounded-circle"
                alt={item?.farmerId?.email}
                onError={e => (e.target.src = PresetUser)}
              />
              <MDBCardText tag={"h6"}>
                {fullName(item?.farmerId?.fullName)}
              </MDBCardText>
            </div>
            <MDBCardText>
              {item.isDiscounted ? (
                <>
                  <MDBTypography
                    tag={"span"}
                    className="text-decoration-line-through h4"
                  >
                    {formatCurrency(item.price)}
                  </MDBTypography>
                  <MDBTypography tag={"span"} className="h4">
                    {" - "}
                  </MDBTypography>
                  <MDBTypography tag={"span"} className="text-success h4">
                    {formatCurrency(item.discounted)}
                  </MDBTypography>
                </>
              ) : (
                formatCurrency(item.price)
              )}
            </MDBCardText>
            <MDBContainer className="d-flex justify-content-center">
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title={"Add to cart"}
              >
                <MDBBtn
                  onClick={() => {
                    setIsBuy(false);
                    setData(item);
                  }}
                  disabled={item.stock <= 0 ? true : false}
                  className="me-3"
                  color="info"
                  size="lg"
                >
                  <MDBIcon icon={`cart-plus`} />
                </MDBBtn>
              </MDBTooltip>
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title={"Buy"}
              >
                <MDBBtn
                  onClick={() => {
                    setIsBuy(true);
                    setData(item);
                  }}
                  disabled={item.stock <= 0 ? true : false}
                  color="success"
                  size="lg"
                >
                  <MDBIcon icon={`money-bill`} />
                </MDBBtn>
              </MDBTooltip>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
}
