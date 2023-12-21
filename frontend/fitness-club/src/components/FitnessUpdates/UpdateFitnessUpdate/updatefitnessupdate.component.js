import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../../firebase";
import Progress from "./Progress";

import "./updatefitnessupdate.css";

import Background from "./img/fitnessupdate.jpg";

export default class updateFitnessUpdate extends Component {
  constructor(props) {
    super(props);

    //if there is no admin navigate to the login page
    const token = localStorage.getItem("x-auth-token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      window.location = "/userlogin";
    }

    if (userRole !== "admin") {
      window.location = "/userlogin";
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      id: "",
      topic: "",
      description: "",
      link: "",
      file: null,
      imageURL: "",
      uploadPercentage: 0,
    };
  }

  componentDidMount() {
    if (!this.props.location.data) {
      window.location = "/FitnessUpdatesTable";
    }

    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/fitnessUpdate/" +
          this.props.location.data
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          id: res.data._id,
          topic: res.data.topic,
          description: res.data.description,
          link: res.data.link,
          imageURL: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadImage(e) {
    e.preventDefault();

    if (this.state.file !== null) {
      const uploadTask = storage
        .ref(`fitnessupdates/${this.state.file.name}`)
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
            .ref("fitnessupdates")
            .child(this.state.file.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ imageURL: url });
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
      topic: this.state.topic,
      description: this.state.description,
      link: this.state.link,
      image: this.state.imageURL,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/fitnessUpdate/updatearticle/" +
          this.state.id,
        formData
      )
      .then((res) => {
        window.location = "/FitnessUpdatesTable";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div class="container">
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
                      style={{
                        backgroundImage: `url(${Background})`,
                        backgroundRepeat:
                          "no-repeat" /* Do not repeat the image */,
                        backgroundSize: "cover",
                      }}
                    >
                      {" "}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h4 class="text-dark mb-4">Update | Fitness Update</h4>
                      </div>
                      <form class="user" onSubmit={this.onFormSubmit}>
                        <div class="form-group">
                          <input
                            class="form-control form-control-user"
                            type="text"
                            id="exampleInputEmail"
                            value={this.state.topic}
                            onChange={(e) => {
                              this.setState({
                                topic: e.target.value,
                              });
                            }}
                            name="Topic"
                          />
                        </div>

                        <div class="form-group">
                          <textarea
                            class="form-control form-control-user"
                            type="text"
                            style={{ borderRadius: "20px" }}
                            value={this.state.description}
                            onChange={(e) => {
                              this.setState({
                                description: e.target.description,
                              });
                            }}
                            name="Description"
                          />
                        </div>

                        <div class="form-group">
                          <input
                            class="form-control form-control-user"
                            type="text"
                            id="exampleInputEmail"
                            value={this.state.link}
                            onChange={(e) => {
                              this.setState({
                                link: e.target.link,
                              });
                            }}
                            name="Link"
                          />
                        </div>

                        <div class="form-group">
                          <label
                            style={{ fontSize: "12px", marginLeft: "15px" }}
                          >
                            Image
                          </label>

                          {this.state.imageURL ? (
                            <img src={this.state.imageURL} width="300px" />
                          ) : (
                            ""
                          )}
                          <div className="row">
                            <div className="col-md-9">
                              <input
                                class="form-control "
                                type="file"
                                id="exampleInputEmail"
                                name="Image"
                                style={{ padding: "2px" }}
                                onChange={(e) => {
                                  this.setState({
                                    file: e.target.files[0],
                                  });
                                }}
                              />
                            </div>
                            <div className="col-md-3">
                              <i
                                style={{ fontSize: "43px" }}
                                class="fas fa-cloud-upload-alt ImageUploadButton"
                                onClick={this.uploadImage}
                              ></i>
                            </div>
                          </div>
                        </div>

                        <Progress percentage={this.uploadPercentage} />
                        <br />

                        <div class="form-group">
                          <button
                            class="btn btn-primary btn-block text-white btn-user"
                            type="submit"
                          >
                            Edit Post
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
  }
}
