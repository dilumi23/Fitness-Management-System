import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InsertFitnessUpdate.css";
import { storage } from "../../../firebase";

import Background from "./img/fitnessupdate.jpg";
import Progress from "./Progress";

export default function InsertFitnessUpdate() {
  const [topic, settopic] = useState(null);
  const [description, setdescription] = useState(null);
  const [link, setlink] = useState(null);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [uploadPercentage, setuploadPercentage] = useState(0);

  useEffect(() => {
    //if there is no admin navigate to the login page
    const token = localStorage.getItem("x-auth-token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      window.location = "/userlogin";
    }

    if (userRole !== "admin") {
      window.location = "/userlogin";
    }
  }, []);

  function onFormSubmit(e) {
    e.preventDefault();

    if (topic == null) {
      alert("Topic is Required");
      return false;
    }
    if (description == null) {
      alert("Description is Required");
      return false;
    }
    if (link == null) {
      alert("Link is Required");
      return false;
    }
    if (imageURL == null) {
      alert("Image is Required");
      return false;
    }

    const formData = {
      topic: topic,
      description: description,
      link: link,
      image: imageURL,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/fitnessUpdate", formData)
      .then((res) => {
        alert("Post Added");

        console.log(formData);

        window.location = "/FitnessUpdatesTable";
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
        console.log(formData);
      });
  }

  function uploadImage(e) {
    e.preventDefault();

    if (file !== null) {
      const uploadTask = storage.ref(`fitnessupdates/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setuploadPercentage(progress);
        },
        (error) => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("fitnessupdates")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setImageURL(url);
            });
        }
      );
    } else {
      alert("First You Must Select An Image");
    }
  }

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
                      <h4 class="text-dark mb-4">Add Fitness Update</h4>
                    </div>
                    <form class="user" onSubmit={onFormSubmit}>
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="topic"
                          placeholder="Enter Topic..."
                          name="topic"
                          onChange={(e) => {
                            settopic(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <textarea
                          class="form-control form-control-user"
                          type="text"
                          style={{ borderRadius: "20px" }}
                          id="description"
                          placeholder="Enter  Description..."
                          name="description"
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="link"
                          placeholder="Enter Link..."
                          name="link"
                          onChange={(e) => {
                            setlink(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                          Image
                        </label>

                        {imageURL ? <img src={imageURL} width="300px" /> : ""}
                        <div className="row">
                          <div className="col-md-9">
                            <input
                              class="form-control "
                              type="file"
                              id="exampleInputEmail"
                              name="Image"
                              style={{ padding: "2px" }}
                              onChange={(e) => {
                                setFile(e.target.files[0]);
                              }}
                            />
                          </div>
                          <div className="col-md-3">
                            <i
                              style={{ fontSize: "43px" }}
                              class="fas fa-cloud-upload-alt ImageUploadButton"
                              onClick={uploadImage}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <Progress percentage={uploadPercentage} />
                      <br />
                      <div class="form-group">
                        <button
                          class="btn btn-primary btn-block text-white btn-user"
                          type="submit"
                        >
                          Add Post
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
