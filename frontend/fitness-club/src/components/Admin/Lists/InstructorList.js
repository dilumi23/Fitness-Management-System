import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Instructor = (props) => (
  <tr>
    <td>{props.instructor.instructorID}</td>
    <td>{props.instructor.name}</td>
    <td>{props.instructor.dob.substring(0, 10)}</td>
    <td>{props.instructor.gender}</td>
    <td>{props.instructor.address}</td>
    <td>{props.instructor.phone}</td>
    <td>{props.instructor.email}</td>
    <td>
      <Link to={"/view/" + props.instructor._id}>Profile</Link> |{" "}
      <Link to={"/update/" + props.instructor._id}>Edit</Link> |{" "}
      <a
        href="/list"
        onClick={() => {
          props.deleteInstructor(props.instructor._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class InstructorList extends Component {
  constructor(props) {
    super(props);
    this.generatePDF = this.generatePDF.bind(this);
    this.deleteInstructor = this.deleteInstructor.bind(this);

    this.state = { instructors: [], searchInstructor: "" };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/instructors/")
      .then((response) => {
        this.setState({ instructors: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generatePDF() {
    const pdfText = {
      instructorList: this.state.instructors,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/pdfgenerate/generateinstructorlist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  deleteInstructor(id) {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/instructors/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      instructors: this.state.instructors.filter((el) => el._id !== id),
    });
  }

  instructorList() {
    //return a single Instructor component for each and every array Element
    return this.state.instructors.map((currentinstructor) => {
      return (
        <Instructor
          instructor={currentinstructor}
          deleteInstructor={this.deleteInstructor}
          key={currentinstructor._id}
        />
      );
    });
  }

  render() {
    return (
      <>
        <div>
          <div>
            <div
              class="modal fade bd-example-modal-xl"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myExtraLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content" style={{ padding: "20px" }}>
                  {" "}
                  <div className="row">
                    {/* Row 1 */}
                    <div className="col-md-9">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Search by ID"
                        aria-label="Search"
                        onChange={(e) => {
                          this.setState({
                            searchInstructor: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                  {/* Row 2 */}
                  <div className="row">
                    <table className="table">
                      <thead className="thead">
                        <tr>
                          <th>Instructor ID</th>
                          <th>Name</th>
                          <th>DOB</th>
                          <th>Gender</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //return a single Instructor component for each and every array Element
                          this.state.instructors.map((currentInstructor) => {
                            if (
                              this.state.searchInstructor ==
                              currentInstructor.instructorID
                            )
                              return (
                                <tr>
                                  <td>{currentInstructor.instructorID}</td>
                                  <td>{currentInstructor.name}</td>
                                  <td>
                                    {currentInstructor.dob.substring(0, 10)}
                                  </td>
                                  <td>{currentInstructor.gender}</td>
                                  <td>{currentInstructor.address}</td>
                                  <td>{currentInstructor.phone}</td>
                                  <td>{currentInstructor.email}</td>
                                  <td>
                                    <Link to={"/view/" + currentInstructor._id}>
                                      Profile
                                    </Link>{" "}
                                    |{" "}
                                    <Link
                                      to={"/update/" + currentInstructor._id}
                                    >
                                      Edit
                                    </Link>{" "}
                                    |{" "}
                                    <a
                                      href="/list"
                                      onClick={() => {
                                        this.deleteInstructor(
                                          currentInstructor._id
                                        );
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              );
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={this.generatePDF}
            style={{ margin: "10px" }}
          >
            Generate PDF
          </button>
          {/* <!-- search feedback modal --> */}
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            style={{ margin: "10px" }}
          >
            search
          </button>
          <br /> <br />
          <h3>Instructor List</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Instructor ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.instructorList()}</tbody>
          </table>
        </div>
      </>
    );
  }
}
