import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SAVE, EDIT, UPDATE } from "../../redux/slices/tasks";

const Form = () => {
  const { edit } = useSelector(state => state.tasks),
    dispatch = useDispatch();

  const handleSave = e => {
    e.preventDefault();

    if (edit._id) {
      dispatch(UPDATE({ id: edit._id, data: { name: edit.name } }));
    } else {
      dispatch(SAVE(edit));
    }
  };

  return (
    <MDBCard className="border shadow mb-3">
      <MDBCardHeader>{edit._id ? "Edit" : "Enter"} task</MDBCardHeader>
      <MDBCardBody className="text-end">
        <form onSubmit={handleSave}>
          <MDBInput
            label="Task name"
            value={edit?.name}
            onChange={e => dispatch(EDIT({ ...edit, name: e.target.value }))}
          />
          <MDBBtn
            color={edit._id ? "info" : "primary"}
            type="submit"
            size="sm"
            className="mt-2"
          >
            {edit._id ? "Update" : "Submit"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Form;
