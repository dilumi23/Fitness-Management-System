import React, { Component } from "react";
import "./ManageGymPackage.css";
import axios from "axios";
import $ from "jquery";
import { storage } from "../../../firebase";
import Progress from "./Progress";
export default class UpdateGymPackage extends Component {
  constructor(props) {
    super(props);

    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      packageName: "",
      packageDescription: "",
      packagePrice: "",
      packagePeriod: "",
      imageURL:
        "https://previews.123rf.com/images/to2ss/to2ss1802/to2ss180200276/96440615-file-cloud-upload-digital-documents-file-folder-vector.jpg",
      file: null,
      editChanger: "",
      updateMode: "Insert",
      uploadPercentage: 0,
    };
  }
  componentDidMount() {
    const packageId = this.props.location.data;
    if (packageId !== undefined) {
      this.setState({
        updateMode: "Update",
      });
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      };

      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + "/api/packages/" + packageId,
          config
        )
        .then(({ data }) => {
          this.setState({
            packageName: data.PackageName,
            packageDescription: data.PackageDescriprion,
            packagePrice: data.PackagePrice,
            packagePeriod: data.PackagePeriod,
            imageURL: data.ImgPath,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onPackageNameChange(e) {
    $("#packageName").css("background-color", "#fff");
    this.setState({
      packageName: e,
    });
  }
  onPackageDesChange(e) {
    $("#packageDes").css("background-color", "#fff");
    this.setState({
      packageDescription: e,
    });
  }
  onPackagePriceChange(e) {
    $("#packagePrice").css("background-color", "#fff");
    this.setState({
      packagePrice: e,
    });
  }

  onPackagePeriodChange(e) {
    $("#packagePeriod").css("background-color", "#fff");
    this.setState({
      packagePeriod: e,
    });
  }

  uploadImage() {
    if (this.state.file !== null) {
      const uploadTask = storage
        .ref(`gympackages/${this.state.file.name}`)
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
            .ref("gympackages")
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

  searchChange = (event) => {
    this.setState({
      searchVal: event.target.value,
    });
  };
  formValidate() {
    var validate = true;

    if (this.state.packageName === "") {
      validate = false;
      $("#packageName").css("background-color", "#ffc0c0");
    }
    if (this.state.packageDescription === "") {
      validate = false;
      $("#packageDes").css("background-color", "#ffc0c0");
    }
    if (this.state.packagePrice === "") {
      validate = false;
      $("#packagePrice").css("background-color", "#ffc0c0");
    }
    return validate;
  }

  submitPackage(e) {
    if (this.formValidate()) {
      if (this.state.updateMode == "Update") {
        const packageId = this.props.location.data;
        try {
          const formData = {
            PackageImageURL: this.state.imageURL,
            PackageName: this.state.packageName,
            PackageDescriprion: this.state.packageDescription,
            PackagePrice: this.state.packagePrice,
            PackagePeriod: this.state.packagePeriod,
          };

          axios
            .put(
              process.env.REACT_APP_BACKEND_URL + "/api/packages/" + packageId,
              formData
            )
            .then((res) => {
              alert("successed");
              window.location = "/PackageDetails";
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const formData = {
            PackageImageURL: this.state.imageURL,
            PackageName: this.state.packageName,
            PackageDescriprion: this.state.packageDescription,
            PackagePrice: this.state.packagePrice,
            PackagePeriod: this.state.packagePeriod,
          };

          axios
            .post(
              process.env.REACT_APP_BACKEND_URL + "/api/packages/",
              formData
            )
            .then((res) => {
              alert("successed");
              window.location = "/PackageDetails";
            })
            .catch((err) => {
              alert(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
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
                      class="flex-grow-1 bg-login-image text-center"
                      style={{ marginTop: "50px" }}
                    >
                      <img
                        src={this.state.imageURL}
                        style={{ width: "300px", height: "300px" }}
                      />{" "}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h4 class="text-dark mb-4">
                          {this.state.updateMode}| Gym Package
                        </h4>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            class="form-control form-control-user"
                            type="text"
                            id="packageName"
                            placeholder="Enter Package Name..."
                            name="name"
                            value={this.state.packageName}
                            onChange={(e) =>
                              this.onPackageNameChange(e.target.value)
                            }
                          />
                        </div>
                        <div class="form-group">
                          <textarea
                            class="form-control form-control-user"
                            type="text"
                            id="packageDes"
                            placeholder="Enter Package Description..."
                            name="description"
                            value={this.state.packageDescription}
                            onChange={(e) =>
                              this.onPackageDesChange(e.target.value)
                            }
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <input
                            class="form-control form-control-user"
                            type="number"
                            id="packagePrice"
                            placeholder="Enter Package Price..."
                            name="price"
                            value={this.state.packagePrice}
                            onChange={(e) =>
                              this.onPackagePriceChange(e.target.value)
                            }
                          />
                        </div>

                        <div class="form-group">
                          <input
                            class="form-control form-control-user"
                            type="number"
                            id="packagePeriod"
                            placeholder="Enter Package Period (months)..."
                            name="packagePeriod"
                            value={this.state.packagePeriod}
                            onChange={(e) =>
                              this.onPackagePeriodChange(e.target.value)
                            }
                          />
                        </div>

                        <div class="row form-group">
                          <div className="col-md-9">
                            <input
                              class="form-control form-control-user"
                              type="file"
                              id="packageImage"
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
                        <Progress percentage={this.state.uploadPercentage} />
                        <br />
                        <div class="form-group">
                          <button
                            class="btn btn-primary btn-block text-white btn-user additemBtn"
                            type="button"
                            onClick={(e) => this.submitPackage(e.target.value)}
                          >
                            {this.state.updateMode} Package
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
