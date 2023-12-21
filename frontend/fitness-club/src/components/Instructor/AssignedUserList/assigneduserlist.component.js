import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Assigneduserlist() {
  const [assigneduserlist, setAssignedUserList] = useState([]);
  const [instructorID, setInstructorID] = useState();

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/authinstructor", config)
      .then((res) => {
        //console.log(res);
        setInstructorID(res.data._id);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  axios
    .get(process.env.REACT_APP_BACKEND_URL + "/api/profile")
    .then((res) => {
      console.log(res);
      setAssignedUserList(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  function userList() {
    return assigneduserlist.map((currentuser) => {
      const bmi =
        currentuser.currentWeight /
        ((currentuser.currentHeight / 100) * (currentuser.currentHeight / 100));

      if (bmi >= 18.5 && bmi < 24.9) {
        if (currentuser.instructor == instructorID) {
          return (
            //style={{ backgroundColor: "rgb(22, 206, 22)", color: "white" }}
            <tr style={{ color: "rgb(11, 166, 11)", fontWeight: "bold" }}>
              <td>{currentuser._id}</td>
              <td>
                {currentuser.user.firstName + " " + currentuser.user.lastName}
              </td>
              <td>
                <Link
                  to={{
                    pathname: "/viewuserprofile",
                    data: currentuser._id,
                  }}
                >
                  <button className="btn btn-outline-success">view</button>
                </Link>
              </td>
            </tr>
          );
        }
      } else {
        //style={{ backgroundColor: "rgb(239, 0, 0)", color: "white" }}
        if (currentuser.instructor == instructorID) {
          return (
            <tr style={{ color: "rgb(239, 0, 0)", fontWeight: "bold" }}>
              <td>{currentuser._id}</td>
              <td>
                {currentuser.user.firstName + " " + currentuser.user.lastName}
              </td>
              <td>
                <Link
                  to={{
                    pathname: "/viewuserprofile",
                    data: currentuser._id,
                  }}
                >
                  <button className="btn btn-outline-danger">view</button>
                </Link>
              </td>
            </tr>
          );
        }
      }
    });
  }

  return (
    <div>
      <br /> <br />
      <h3>Assigned User List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Profile ID</th>
            <th>Name</th>
            <th>Check Progress</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
}
