import React from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY, EDIT, UPDATE } from "../../redux/slices/tasks";
import Swal from "sweetalert2";

const List = () => {
  const { browse } = useSelector(state => state.tasks),
    dispatch = useDispatch();

  const handleComplete = id =>
    dispatch(UPDATE({ id, data: { isCompleted: true } }));

  const handleEdit = name => dispatch(EDIT(name));

  const handleDelete = id =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(DESTROY(id));
      }
    });

  return (
    <MDBListGroup>
      <MDBListGroupItem active aria-current="true" className="px-3">
        Tasks
      </MDBListGroupItem>
      {browse.length > 0 ? (
        browse.map((task, index) => (
          <MDBListGroupItem
            key={`task-${index}`}
            className="px-3 d-flex justify-content-between"
          >
            <span
              style={{ textDecoration: task.isCompleted && "line-through" }}
            >
              {task.name}
            </span>
            <MDBBtnGroup>
              {!task.isCompleted && (
                <>
                  <MDBBtn
                    onClick={() => handleComplete(task._id)}
                    size="sm"
                    color="success"
                    title="Complete"
                  >
                    <MDBIcon icon="check" />
                  </MDBBtn>
                  <MDBBtn
                    onClick={() => handleEdit(task)}
                    size="sm"
                    color="info"
                    title="Edit"
                  >
                    <MDBIcon icon="pen" />
                  </MDBBtn>
                </>
              )}

              <MDBBtn
                onClick={() => handleDelete(task._id)}
                size="sm"
                color="danger"
                title="Delete"
              >
                <MDBIcon icon="trash" />
              </MDBBtn>
            </MDBBtnGroup>
          </MDBListGroupItem>
        ))
      ) : (
        <MDBListGroupItem className="px-3">No task added</MDBListGroupItem>
      )}
    </MDBListGroup>
  );
};

export default List;
