import React, { useState, useEffect } from "react";
import axios from "axios";

import "./AddRequirementsToTheInstructor.css";

import Background from "./img/gymbannner.jpg";
import { Modal } from "@material-ui/core";

const AddRequirementsToTheInstructor = () => {
  const [instructorID, setInstructorID] = useState(null);
  const [instructorName, setInstructorName] = useState(null);
  const [instructorContact, setInstructorContact] = useState(null);
  const [instructorEmail, setInstructorEmail] = useState(null);
  const [userProfile, setProfileID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [gender, setGender] = useState("Male");
  const [requirement, setRequirement] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile/me", config)
      .then((res) => {
        console.log("ProfileId IS" + res.data._id);
        console.log("Profile Name is " + res.data.user.firstName);
        console.log(res.data.instructor);
        setProfileID(res.data._id);
        setUserName(res.data.user.firstName + " " + res.data.user.lastName);
        setInstructorID(res.data.instructor);

        axios
          .get(
            process.env.REACT_APP_BACKEND_URL +
              "/api/instructors/" +
              res.data.instructor
          )

          
          .then((res) => {
            console.log("Instructor Details :" + res.data);
            setInstructorName(res.data.name);
            setInstructorContact(res.data.phone);
            setInstructorEmail(res.data.email);

            console.log("Instructor Details :" + res.data);
            // alert(res.data.name)
          });
      });
  }, []);

  function RemoveInstructor(e) {
    e.preventDefault();

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    const newInstructor = {
      instructor: "null",
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/profile/unassigninstructor",
        newInstructor,
        config
      )
      .then(() => {
        alert("unassigned");
        window.location = "/dashboard";
      })
      .catch((err) => {
        alert(err);
      });
  }

  function submitHandler(e) {
    e.preventDefault();

    if (instructorID == null) {
      alert("Instructor Must be assigned");
      return false;
    }
    if (weight == null) {
      alert("weight is required");
      return false;
    }
    if (height == null) {
      alert("height is required");
      return false;
    }
    if (gender == null) {
      alert("gender is required");
      return false;
    }
    if (requirement == null) {
      alert("requirement is required");
      return false;
    }

    const newUserRequest = {
      instructorID,
      userProfile,
      userName,
      weight,
      height,
      gender,
      requirement,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/instructors/adduserrequests",
        newUserRequest
      )
      .then((res) => {
        alert("Request Success");
        window.location = "/dashboard";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div class="container">
      {/* // Instructor Details Modal
    // <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Instructor Details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Instructor : {instructorName} </p>
              <p>Contact : {instructorContact}</p>
              <p>Email : {instructorEmail}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                onClick={RemoveInstructor}
              >
                Remove
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-9 col-lg-12 col-xl-10">
          <div
            class="card  o-hidden border-0 my-5"
            style={{
              // border: "2px solid blue",
              borderRadius: "20px",
              boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
            }}
          >
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-flex">
                  <div
                    class="flex-grow-1 bg-login-image"
                    style={{ backgroundImage: `url(${Background})` }}
                  >
                    {" "}
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div className="text-center">
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        View Instructor Details
                      </button>
                    </div>

                    <hr />
                    <div class="text-center">
                      <h4 class="text-dark mb-4">Add Your Requirement</h4>
                    </div>
                    <form class="user" onSubmit={submitHandler}>
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="number"
                          placeholder="Enter Weight..."
                          name="Weight"
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="number"
                          placeholder="Enter Height..."
                          name="Height"
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <select
                          class="form-control"
                          style={{ borderRadius: "20px" }}
                          id="exampleInputEmail"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        >
                          <option value="Male" class="form-control">
                            Male
                          </option>
                          <option value="Female" class="form-control">
                            Female
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <textarea
                          class="form-control form-control-user"
                          type="text"
                          style={{ borderRadius: "20px" }}
                          placeholder="Enter Your Requirement..."
                          name="Requirement"
                          onChange={(e) => {
                            setRequirement(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <button
                          class="btn btn-primary btn-block text-white btn-user"
                          type="submit"
                        >
                          Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequirementsToTheInstructor;
