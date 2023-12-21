import React, { Component } from "react";
import axios from "axios";

export default class UpdateInstructor extends Component {
  constructor(props) {
    super(props);

    this.onChangeInstructorId = this.onChangeInstructorId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      instructorId: "",
      name: "",
      dob: new Date(),
      gender: "Male",
      address: "",
      phone: null,
      email: "",
      password: "",
      instructors: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/instructors/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          instructorId: response.data.instructorID,
          name: response.data.name,
          dob: response.data.dob,
          gender: response.data.gender,
          address: response.data.address,
          phone: response.data.phone,
          email: response.data.email,
          password: response.data.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/instructors/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            instructors: response.data.map(
              (instructor) => instructor.instructorID
            ),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeInstructorId = (e) => {
    this.setState({ instructorId: e.target.value });
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
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

  onSubmit(e) {
    e.preventDefault();

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

    axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          "/api/instructors/update/" +
          this.props.match.params.id,
        instructor
      )
      .then((res) => {
        console.log(res.data);
        window.location = "/list";
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <h3 style={{ margin: "20px" }}>Update Instructor</h3>
        <form onSubmit={this.onSubmit} style={{ margin: "20px" }}>
          <div className="form-group">
            <label>Instructor ID: </label>
            <select
              readOnly
              disabled
              required
              className="form-control"
              value={this.state.instructorId}
              onChange={this.onChangeInstructorId}
            >
              {this.state.instructors.map(function (instructor) {
                return (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Address </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="phone"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>

          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Instructor"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
