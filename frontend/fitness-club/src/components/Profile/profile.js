import React, { Component } from "react";
import axios from "axios";
import Progress from "./Progress";
import { storage } from "../../firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.profileDelete = this.profileDelete.bind(this);
    this.editInfo = this.editInfo.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      userid: "",
      username: "",
      fristName: "",
      lastName: "",
      email: "",
      address: "",
      mobileNo: "",
      file: null,
      imageURL: "",
      profileImage:
        "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
      uploadPercentage: "",
    };
  }

  //fetching user details from backend
  componentDidMount() {
    //const token = localStorage.getItem("x-auth-token");

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/userprofile/", config)
      .then((response) => {
        this.setState({
          userid: response.data._id,
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

        if (response.data.profImage) {
          this.setState({
            profileImage: response.data.profImage,
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }

  /*Image Uploading*/
  onChangeFile = (event) => {
    // Update the state
    this.setState({ file: event.target.files[0] });
  };

  uploadImage(e) {
    e.preventDefault();

    if (this.state.file !== null) {
      const uploadTask = storage
        .ref(`users/${this.state.file.name}`)
        .put(this.state.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ uploadPercentage: progress });
        },
        (error) => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("users")
            .child(this.state.file.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ imageURL: url, profileImage: url });
            });
        }
      );
    } else {
      alert("First You Must Select An Image");
    }
  }

  onFormSubmit(e) {
    e.preventDefault();

    const formData = {
      imageURL: this.state.imageURL,
    };

    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/userprofile/updateimage/" +
          this.state.userid,
        formData
      )
      .then((res) => {
        window.location = "/";
      })
      .catch((error) => {
        alert(error);
      });
  }

  profileDelete(e) {
    //const token = localStorage.getItem("x-auth-token");

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/userprofile/", config)
      .then((response) => {
        console.log("Profile Deleted");
        localStorage.removeItem("x-auth-token");
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editInfo(e) {
    window.location = "/profileUpdate";
  }

  addTime(e) {
    window.location = "/addTime";
  }

  render() {
    return (
      <div class="container-fluid">
        <h3 class="text-dark mb-4">My Profile</h3>
        <div class="row mb-3">
          <div class="col-lg-4">
            <center>
              <div class="card mb-3">
                <div class="card-body text-center shadow">
                  <img
                    class="rounded-circle mb-3 mt-4"
                    src={this.state.profileImage}
                    width="160"
                    height="160"
                  />

                  <form class="user" onSubmit={this.onFormSubmit}>
                    <div class="form-group row">
                      <div class="col-sm-9">
                        <input
                          type="file"
                          id="profImage"
                          name="profImage"
                          onChange={this.onChangeFile}
                        />
                        .
                      </div>
                      <div class="col-sm-3">
                        {" "}
                        <i
                          style={{ fontSize: "43px" }}
                          class="fas fa-cloud-upload-alt ImageUploadButton"
                          onClick={this.uploadImage}
                        ></i>
                      </div>
                    </div>

                    <Progress percentage={this.state.uploadPercentage} />
                    <br />

                    <div class="mb-3">
                      <button
                        class="CreateBTN btn btn-primary btn-block text-white btn-user"
                        id="signup"
                        name="signup"
                        type="submit"
                      >
                        Change
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </center>
            <div class="card shadow mb-4"></div>
          </div>
          <div class="col-lg-8">
           
            <div class="row">
              <div class="col">
                <div class="card shadow mb-3">
                  <div class="card-body">
                    <form class="profileUpdate1">
                      <div class="form-row">
                        <div class="col-md-6 col-sm-12">
                          <div class="form-group">
                            <label for="username">
                              <strong>Username</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Username"
                              value={this.state.firstName}
                              name="username"
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <div class="form-group">
                            <label for="email">
                              <strong>Email Address</strong>
                            </label>
                            <input
                              class="form-control"
                              type="email"
                              placeholder="user@example.com"
                              value={this.state.email}
                              name="email"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="col-md-6 col-sm-12">
                          <div class="form-group">
                            <label for="firstName">
                              <strong>First Name</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="First name"
                              value={this.state.firstName}
                              name="firstName"
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <div class="form-group">
                            <label for="lastName">
                              <strong>Last Name</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Last name"
                              value={this.state.lastName}
                              name="lastName"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="card shadow">
                  <div class="card-body">
                    <form class="profileUpdate2">
                      <div class="form-group">
                        <label for="address">
                          <strong>Address</strong>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Address"
                          value={this.state.address}
                          name="address"
                        />
                      </div>
                      <div class="form-row">
                        <div class="col-md-6 col-sm-12">
                          <div class="form-group">
                            <label for="mobileNo">
                              <strong>Mobile Number</strong>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Mobile Number"
                              value={this.state.mobileNo}
                              name="mobileNo"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center>
          <div class="mb-3" style={{ justifyContent: "space-between" }}>
            <button
              class="btn btn-primary btn-sm"
              type="button"
              onClick={this.editInfo}
            >
              Change Info
            </button>{" "}
            <button
              class="btn btn-primary btn-sm"
              type="button"
              onClick={this.profileDelete}
            >
              Delete Profile
            </button>{" "}
            <button
              class="btn btn-primary btn-sm"
              type="button"
              onClick={this.addTime}
            >
              Add Time
            </button>
          </div>
        </center>
      </div>
    );
  }
}
