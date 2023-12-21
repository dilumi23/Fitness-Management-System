import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserRemain(props) {
  return (
    <tr>
      <td>{props.remainuser?.user?._id}</td>
      <td>
        {props.remainuser?.user?.firstName + " " + props.remainuser?.user?.lastName}
      </td>
      <td>{props.remainuser?.package}</td>
      <td>
        <Link
          to={"/assigninstructorform/" + props.remainuser._id}
          className="btn btn-info"
        >
          {" "}
          Assign
        </Link>
      </td>
    </tr>
  );
}

export default function AssignInstructor() {
  const [remainingUserList, setRemainingUserList] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile")
      .then((res) => {
        console.log(res.data);
        setRemainingUserList(res.data);
      });
  }, []);

  function userList() {
    //return a single Instructor component for each and every array Element
    return remainingUserList.map((currentuser) => {
      if (currentuser.subscriptionDate !== null) {
        if (!currentuser.instructor || currentuser.instructor === "null") {
          return (
            <UserRemain
              remainuser={currentuser}
              //   deleteRemainingUser={deleteRemainingUser}
              key={currentuser._id}
            />
          );
        }
      }
    });
  }

  return (
    <div>
      <h3>Remaining User List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Package</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
}
