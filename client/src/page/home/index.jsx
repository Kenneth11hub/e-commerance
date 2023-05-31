import React, { useEffect } from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import "./index.css";
import Form from "./form";
import List from "./list";
import { useDispatch } from "react-redux";
import { BROWSE } from "../../redux/slices/tasks";

const Initial = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE());
  }, []);

  return (
    <MDBContainer fluid className="px-0">
      <MDBCol md={6} className="offset-md-3 my-5">
        <Form />
        <List />
      </MDBCol>
    </MDBContainer>
  );
};

export default Initial;
