import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import ProfileOverview from "./overview";
import ProfileSettings from "./settings";
import ProfileSecurity from "./security";
import { useSelector } from "react-redux";

const ProfileTabs = ({ activeIndex, setActiveIndex }) => {
  const { theme } = useSelector(state => state.auth);

  return (
    <MDBCard className={`${theme.bg} ${theme.text} mt-5`}>
      <MDBCardBody className="px-2 px-md-4">
        <MDBTabsContent>
          <MDBTabsPane show={activeIndex === 0}>
            <ProfileOverview setActiveIndex={setActiveIndex} />
          </MDBTabsPane>
          <MDBTabsPane show={activeIndex === 1}>
            <ProfileSettings />
          </MDBTabsPane>
          <MDBTabsPane show={activeIndex === 2}>
            <ProfileSecurity />
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProfileTabs;
