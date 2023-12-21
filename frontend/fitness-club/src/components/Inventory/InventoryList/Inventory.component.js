import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./InventoryGrid.css";

// Single item functional component start
function InventoryList({
  id,
  serialNum,
  ItemType,
  ItemBrand,
  ManufacturelDate,
  ServiceDate,
  Warranty,
  PurchasedDate,
  ItemImage,
}) {
  return (
    <div className="col-md-4" style={{ padding: "10px" }}>
      <div
        class="card shadow ShopItem"
        data-bs-hover-animate="pulse"
        style={{ padding: "10px" }}
      >
        <div class="card-body">
          <div class="card border-white">
            <img
              style={{ height: "250px" }}
              class="card-img w-100 d-block"
              data-bs-hover-animate="pulse"
              src={ItemImage}
              alt="itemImage"
            />
          </div>
          
          <center>
          <h5
            class="card-title"
            style={{ fontFamily: "Nunito, sans-serif", color: "black" }}
          >
            {ItemType}
          </h5>
          </center>
          <h6 class = "text-muted card-subtitle mb-2">
          <br />
            Serial Number{" "}
            <span style={{ color: "black" }}>
              {serialNum.substring(0, 10)}
            </span>
            <br />
          </h6>
          <h6 class="text-muted card-subtitle mb-2">
          <br />
            Item Brand{" "}
            <span style={{ color: "black" }}>
              {ItemBrand.substring(0, 10)}
            </span>
          </h6>
          <h6 class="text-muted card-subtitle mb-2">
            <br />
            Manufactured Date{" "}
            <span style={{ color: "black" }}>
              {ManufacturelDate.substring(0, 10)}
            </span>
            <br />
          </h6>
          <h6 class="text-muted card-subtitle mb-2">
            <br />
            Purchased Date{" "}
            <span style={{ color: "black" }}>
              {PurchasedDate.substring(0, 10)}
            </span>
            <br />
          </h6>
          <h6 class="text-muted card-subtitle mb-2">
            <br />
            ServiceDate Date{" "}
            <span style={{ color: "black" }}>
              {ServiceDate.substring(0, 10)}
            </span>
            <br />
          </h6>
          <h6 class="text-muted card-subtitle mb-2">
            <br />
            Warranty{" "}
            <span style={{ color: "black" }}>{Warranty + " years"}</span>
            <br />
          </h6>
          <br />
          <div class="row">
            <div class="col">
              <Link
                to={{
                  pathname: "/UpdateInventoryitems",
                  data: id,
                }}
              >
                <button class="btn btn-info">Edit</button>
              </Link>
            </div>
            <div class="col">
              <button
                class="btn btn-danger"
                type="button"
                onClick={(e) => {
                  axios
                    .delete(
                      process.env.REACT_APP_BACKEND_URL +
                        "/api/inventory/removeItem/" +
                        id
                    )
                    .then((res) => {
                      alert("Item Removed");
                      window.location = "/inventorytable";
                    })
                    .catch((err) => {
                      alert("Unsuccessful");
                    });
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryGrid() {
  const [inventory, setInventory] = useState([]);
  const [searchInventory, setSearchInventory] = useState();

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

    const sendData = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_BACKEND_URL + "/api/inventory")
          .then((res) => {
            console.log(res);
            setInventory(res.data);
            // setLoading(false);
          })
          .catch((error) => {
            console.log("No data");
          });
      } catch (error) {
        console.log("No Data CATCH");
      }
    };

    sendData();
  }, []);

  function generatePDF() {
    const pdfText = {
      inventory: inventory,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/pdfgenerate/generateinventorylist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
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
                      type="date"
                      placeholder="Search by Date"
                      aria-label="Search"
                      onChange={(e) => {
                        setSearchInventory(e.target.value.substring(0, 10));
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
                        <th>Inventory ID</th>
                        <th>serial Num</th>
                        <th>Item Type</th>
                        
                        <th>Item Brand</th>
                        <th>Service Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        //return a single inventory component for each and every array Element
                        inventory.map((currentInventory) => {
                          if (
                            searchInventory ==
                            currentInventory.ServiceDate.substring(0, 10)
                          )
                            return (
                              <tr>
                                <td>{currentInventory._id}</td>
                                <td>{currentInventory.serialNum}</td>
                                <td>{currentInventory.ItemType}</td>
                                <td>{currentInventory.ItemBrand}</td>
                                <td>{currentInventory.ServiceDate}</td>
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

      <div class="row text-center">
        <div class="col-md-4">
          <a href="/addinventoryitems">
            <button class="btn btn-primary additem-btn"> Add Item </button>
          </a>
        </div>

        <div class="col-md-4">
          {/* <!-- search inventory  modal --> */}
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            style={{ margin: "10px" }}
          >
            search by date
          </button>
        </div>

        <div class="col-md-4">
          <button class="btn btn-primary additem-btn" onClick={generatePDF}>
            {" "}
            Generate Report{" "}
          </button>
        </div>
      </div>

      {/* Ecommerce grid */}
      <div style={{ margin: "2px" }}>
        <div class="row" style={{ margin: "10px" }}>
          {/* Item Column */}
          {inventory.map((currentItem) => (
            <InventoryList
              id={currentItem._id}
              key={currentItem._id}
              serialNum={currentItem.serialNum}
              ItemType={currentItem.ItemType}
              ItemBrand={currentItem.ItemBrand}
              ManufacturelDate={currentItem.ManufacturelDate}
              ServiceDate={currentItem.ServiceDate}
              Warranty={currentItem.Warranty}
              PurchasedDate={currentItem.PurchasedDate}
              ItemImage={currentItem.ItemImage}
            />
          ))}

          {/* End of column */}
        </div>
      </div>
    </div>
  );
}
