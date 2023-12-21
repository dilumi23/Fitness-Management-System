import React, { Component } from "react";
import axios from "axios";
import "../../assets/css/styles.css";
import "../../assets/bootstrap/css/bootstrap.min.css";

export default class InsertInstructor extends Component {
  constructor(props) {
    super(props);

    this.onChangeInstructorId = this.onChangeInstructorId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      instructorId: "",
      name: "",
      dob: new Date(),
      gender: "Male",
      address: "",
      phone: null,
      email: "",
      password: "",
    };
  }

  submitHandler(e) {
    e.preventDefault();

    let tempName = this.state.name;
    let tempPhone = this.state.phone;
    let tempPassword = [this.state.tempPassword];
    let errors = [];

    if (!tempName.match(/^[a-zA-Z]+$/)) {
      errors.push("Name : Letters Only");
    }

    if (tempPhone.length != 10) {
      errors.push("Phone : 10 Digits Only");
    }

    if (errors.length == 0) {
      const instructor = {
        instructorID: this.state.instructorId,
        name: this.state.name,
        dob: this.state.dob,
        gender: this.state.gender,
        address: this.state.address,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/api/instructors/add",
          instructor,
          config
        )
        .then((res) => {
          alert(res.data);
          window.location = "/list";
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert(errors.pop());
    }
  }

  onChangeInstructorId = (e) => {
    this.setState({ instructorId: e.target.value });
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeDob = (e) => {
    this.setState({ dob: e.target.value });
  };

  onChangeGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  onChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <>
        <header>
          <h3 style={{ marginLeft: "20px" }}>Instructor Info</h3>
        </header>
        <div class="card" style={{ margin: "20px", padding: "0px" }}>
          <div
            class="card-body border rounded-0"
            style={{ margin: "0px", padding: "20px" }}
          >
            <form onSubmit={this.submitHandler} style={{ margin: "0px" }}>
              <div class="form-row" style={{ margin: "-6px" }}>
                <div
                  class="col"
                  style={{
                    padding: "22px",
                    paddingTop: "10px",
                    paddingLeft: "15px",
                  }}
                >
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Instructor ID
                    <input
                      required
                      class="form-control"
                      type="text"
                      value={this.state.instructorId}
                      onChange={this.onChangeInstructorId}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Name
                    <input
                      required
                      class="form-control"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />

                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    DOB
                    <input
                      required
                      class="form-control"
                      type="date"
                      value={this.state.dob}
                      onChange={this.onChangeDob}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Gender
                    <select
                      onChange={this.onChangeGender}
                      class="form-control"
                      value={this.state.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                </div>

                <div
                  class="col"
                  style={{
                    padding: "22px",
                    paddingTop: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Address
                    <input
                      required
                      class="form-control"
                      type="text"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Phone
                    <input
                      required
                      class="form-control"
                      type="phone"
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Email
                    <input
                      required
                      class="form-control"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                  <br />
                  <label
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Password
                    <input
                      required
                      class="form-control"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      style={{ width: "475px", marginTop: "4px" }}
                    ></input>
                  </label>
                </div>
              </div>
              <div class="form-row" style={{ margin: "-6px" }}>
                <div
                  class="col"
                  style={{
                    padding: "22px",
                    paddingTop: "10px",
                    paddingLeft: "15px",
                  }}
                >
                  <center>
                    <input
                      class="form-control btn btn-primary"
                      type="submit"
                      style={{
                        width: "100px",
                        marginTop: "4px",
                        textAlign: "center",
                      }}
                    ></input>
                  </center>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
