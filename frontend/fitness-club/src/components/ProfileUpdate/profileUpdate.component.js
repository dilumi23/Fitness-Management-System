import React, { Component } from "react";
import axios from "axios";

export default class ProfileUpdate extends Component {
  constructor(props) {
    super(props);

    this.onSubmitContact = this.onSubmitContact.bind(this);
    this.onSubmitPersonal = this.onSubmitPersonal.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeMobileNo = this.onChangeMobileNo.bind(this);

    this.state = {
      username: "",
      fristName: "",
      lastName: "",
      email: "",
      address: "",
      mobileNo: "",
    };
  }

  componentDidMount() {
   

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/userprofile/", config)
      .then((response) => {
        this.setState({
          username: response.data.firstName,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          mobileNo: response.data.mobileNo,
          gender: response.data.gender,
          password: response.data.password,
          password2: response.data.password2,
        });
      })

      .catch((error) => {
        console.log(error);
      });

    
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeMobileNo(e) {
    this.setState({
      mobileNo: e.target.value,
    });
  }

  onSubmitPersonal(e) {
    e.preventDefault();

    const personal = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      mobileNo: this.state.mobileNo,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2,
    };

    console.log(personal);

  

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/userprofile/",
        personal,
        config
      )
      .then((response) => {
        console.log(response.data);
        alert("Success");
        window.location = "/profile";
      })
      .catch((error) => {
        alert(error);
      });
  }

  onSubmitContact(e) {
    e.preventDefault();

    const contact = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      mobileNo: this.state.mobileNo,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2,
    };

    console.log(contact);


    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/userprofile/",
        contact,
        config
      )
      .then((response) => {
        console.log(response.data);
        window.location = "/profile";
      });
  }

  render() {
    return (
      <div class="container-fluid">
        <h3 class="text-dark mb-4">Edit Info</h3>
        <div class="row mb-3">
          <div class="col-lg-4">
            {}
            <div class="card shadow mb-4"></div>
          </div>
          <div class="col-lg-8">
            <div class="row mb-3 d-none">
              <div class="col">
                <div class="card text-white bg-primary shadow">
                  <div class="card-body">
                    <div class="row mb-2">
                      <div class="col">
                        <p class="m-0">Peformance</p>
                        <p class="m-0">
                          <strong>65.2%</strong>
                        </p>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-rocket fa-2x"></i>
                      </div>
                    </div>
                    <p class="text-white-50 small m-0">
                      <i class="fas fa-arrow-up"></i>&nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card text-white bg-success shadow">
                  <div class="card-body">
                    <div class="row mb-2">
                      <div class="col">
                        <p class="m-0">Peformance</p>
                        <p class="m-0">
                          <strong>65.2%</strong>
                        </p>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-rocket fa-2x"></i>
                      </div>
                    </div>
                    <p class="text-white-50 small m-0">
                      <i class="fas fa-arrow-up"></i>&nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card shadow mb-3">
                  <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">
                      User Settings
                    </p>
                  </div>
                  <div class="card-body">
                    <form
                      onSubmit={this.onSubmitPersonal}
                      class="profileUpdate1"
                    >
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="username">
                              <strong>Username</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              name="username"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <label for="email">
                              <strong>Email Address</strong>
                            </label>
                            <input
                              class="form-control"
                              type="email"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                              name="email"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="first_name">
                              <strong>First Name</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              value={this.state.firstName}
                              onChange={this.onChangeFirstname}
                              name="firstName"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <label for="last_name">
                              <strong>Last Name</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              value={this.state.lastName}
                              onChange={this.onChangeLastname}
                              name="lastName"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <button class="btn btn-primary btn-sm" type="submit">
                          Save Settings
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="card shadow">
                  <div class="card-header py-3">
                    <p class="text-primary m-0 font-weight-bold">
                      Contact Settings
                    </p>
                  </div>
                  <div class="card-body">
                    <form
                      onSubmit={this.onSubmitContact}
                      class="profileUpdate2"
                    >
                      <div class="form-group">
                        <label for="address">
                          <strong>Address</strong>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          value={this.state.address}
                          onChange={this.onChangeAddress}
                          name="address"
                        />
                      </div>
                      <div class="form-row">
                        <div class="col">
                          <div class="form-group">
                            <label for="mobileNo">
                              <strong>Mobile Number</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              value={this.state.mobileNo}
                              onChange={this.onChangeMobileNo}
                              name="mobileNo"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <button class="btn btn-primary btn-sm" type="submit">
                          Save&nbsp;Settings
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
    );
  }
}
