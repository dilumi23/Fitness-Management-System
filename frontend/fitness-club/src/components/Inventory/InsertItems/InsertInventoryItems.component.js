import React, { useState, useEffect } from "react";

import "./InsertInventoryItems.css";

import axios from "axios";

import { storage } from "../../../firebase";

import Progress from "./Progress";

import Background from "./img/gymbanner.jpg";

export default function InsertInventoryItems() {
  const[serialNum,setserialNum] = useState(null);
  const [ItemType, setItemType] = useState(null);

  const [ItemBrand, setItemBrand] = useState(null);
  const [ManufacturelDate, setManufacturelDate] = useState(null);
  const [ServiceDate, setServiceDate] = useState(null);
  const [Warranty, setWarranty] = useState(null);
  const [PurchasedDate, setPurchasedDate] = useState(null);
  const [file, setItemImage] = useState(null);
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
    if (serialNum == null) {
      alert("Item ID is required");
      return false;
    }

    if (ItemType == null) {
      alert("Item Type is required");
      return false;
    }
    if (ItemBrand == null) {
      alert("Item Brand is required");
      return false;
    }
    if (ManufacturelDate == null) {
      alert("Manufacturel Date  is required");
      return false;
    }
    if (ServiceDate == null) {
      alert("Service Date is required");
      return false;
    }
    if (Warranty == null) {
      alert("Warranty is required");
      return false;
    }
    if (PurchasedDate == null) {
      alert("Purchased Date  is required");
      return false;
    }
    if (imageURL == null) {
      alert("Image  is required");
      return false;
    }

    const formData = {
      serialNum: serialNum,
      ItemType: ItemType,
      ItemBrand: ItemBrand,
      ManufacturelDate: ManufacturelDate,
      ServiceDate: ServiceDate,
      Warranty: Warranty,
      PurchasedDate: PurchasedDate,
      imageURL: imageURL,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/inventory/additems",
        formData
      )
      .then((res) => {
        window.location = "/inventorytable";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function uploadImage(e) {
    e.preventDefault();

    if (file !== null) {
      const uploadTask = storage.ref(`inventory/${file.name}`).put(file);
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
            .ref("inventory")
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
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h4 class="text-dark mb-4">Inventory | Add Items</h4>
                    </div>

                    <form class="user">
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="exampleInputEmail"
                          placeholder="Enter Item ID.."
                          name="serialNum"
                          onChange={(e) => {
                            setserialNum(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="exampleInputEmail"
                          placeholder="Enter Item Type..."
                          name="Type"
                          onChange={(e) => {
                            setItemType(e.target.value);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="exampleInputEmail"
                          placeholder="Enter Item Brand..."
                          name="Brand"
                          onChange={(e) => {
                            setItemBrand(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                          Manufactured Date
                        </label>
                        <input
                          class="form-control form-control-user"
                          type="date"
                          style={{ borderRadius: "20px" }}
                          placeholder="Enter Manufactural Date..."
                          name="ManufacturalDate"
                          onChange={(e) => {
                            setManufacturelDate(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                          Service Date
                        </label>
                        <input
                          class="form-control form-control-user"
                          type="date"
                          style={{ borderRadius: "20px" }}
                          placeholder="Enter Service Date..."
                          name="ServiceDate"
                          onChange={(e) => {
                            setServiceDate(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          class="form-control form-control-user"
                          type="number"
                          id="exampleInputEmail"
                          placeholder="Enter Warranty Period (Years)..."
                          name="Warranty"
                          onChange={(e) => {
                            setWarranty(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                          Purchased Date
                        </label>
                        <input
                          class="form-control form-control-user"
                          type="date"
                          style={{ borderRadius: "20px" }}
                          placeholder="Enter Purchased Date..."
                          name="PurchasedDate"
                          onChange={(e) => {
                            setPurchasedDate(e.target.value);
                          }}
                        />
                      </div>

                      <div class="form-group">
                        <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                          Image
                        </label>
                        <img src={imageURL} width="300px" />
                        <div className="row">
                          <div className="col-md-9">
                            <input
                              class="form-control "
                              type="file"
                              id="exampleInputEmail"
                              name="Image"
                              style={{ padding: "2px" }}
                              onChange={(e) => {
                                setItemImage(e.target.files[0]);
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
                          class="btn btn-primary btn-block text-white btn-user additemBtn"
                          onClick={onFormSubmit}
                        >
                          Add Item
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
