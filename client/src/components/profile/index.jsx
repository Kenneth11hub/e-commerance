import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBRipple,
  MDBIcon,
  MDBTypography,
  MDBCardFooter,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabs,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { fullName, PresetUser, ENDPOINT, formatCurrency } from "../utilities";
import "./index.css";
import ProfileTabs from "./tabs";

const tabs = ["Overview", "Settings", "Security"];

const UserProfile = () => {
  const { theme, auth } = useSelector(state => state.auth),
    [activeIndex, setActiveIndex] = useState(0),
    [statistics, setStatistics] = useState([]);

  useEffect(() => {
    if (auth._id) {
      setStatistics([
        {
          name: "Salary",
          tooltip: "Hourly salary rate",
          value: formatCurrency(auth.rate),
        },
        {
          name: "Conjugation",
          tooltip: "Date you joined",
          value: new Date(auth.createdAt).toDateString(),
        },
      ]);
    }
  }, [auth]);

  return (
    <MDBContainer className="mt-5">
      <MDBCard className={`${theme.bg} ${theme.text}`}>
        <MDBCardBody className="text-md-start text-center">
          <MDBRow>
            <MDBCol md={3}>
              <MDBRipple>
                <img
                  src={`${ENDPOINT}/assets/profile/${auth.email}.jpg`}
                  className="img-fluid rounded img-thumbnail mb-2 mb-md-0 img-max"
                  alt={auth.username}
                  onError={e => (e.target.src = PresetUser)}
                />
              </MDBRipple>
            </MDBCol>
            <MDBCol md={9}>
              <MDBRow>
                <MDBCol md={12}>
                  <span className="text-capitalize h5" title="Fullname">
                    {fullName(auth.fullName)}
                  </span>
                  <MDBTypography className="mb-0" title="Role Type">
                    <MDBIcon icon="user-circle" />
                    &nbsp;
                    {auth.role?.display_name}
                  </MDBTypography>
                  <MDBTypography className="mb-0" title="E-mail Address">
                    <MDBIcon icon="envelope" />
                    &nbsp;
                    {auth.email}
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
        <MDBCardFooter>
          <MDBTabs fill justify>
            {tabs.map((tab, index) => (
              <MDBTabsItem key={`profile-tab-${index}`}>
                <MDBTabsLink
                  className={`bg-transparent ${theme.text} border-${
                    activeIndex === index && theme.border
                  }`}
                  onClick={() => setActiveIndex(index)}
                  active={activeIndex === index}
                >
                  {tab}
                </MDBTabsLink>
              </MDBTabsItem>
            ))}
          </MDBTabs>
        </MDBCardFooter>
      </MDBCard>
      <ProfileTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </MDBContainer>
  );
};
export default UserProfile;
