import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import emailjs from "emailjs-com";


export default function MainCart() {

 
  const [packagePrice, setPackagePrice] = useState(0);
  const [packageName, setPackageName] = useState(0);
  const [packagePeriod, setPackagePeriod] = useState(0);

  //let packagePrice;
  const location = useLocation();

  
  useEffect(() => {
    setPackagePrice(location.state);
    setPackageName(location.name);
    setPackagePeriod(location.period);
    console.log(location.state);
    
  }, []);

  const selectPackage = async (e) => {
    e.preventDefault();
    const PackageDetials = {
      package: packageName,
      packagePeriod: packagePeriod,
      verify: "no",
    };

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    emailjs
      .sendForm(
        "service_dui2lmf",
        "template_6qn296n",
        e.target,
        "URg1Kl0iHfCw9aIas"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email Sent");

          //enroll to a package send data to package
          axios
            .post(
              process.env.REACT_APP_BACKEND_URL + "/api/profile/",
              PackageDetials,
              config
            )
            .then((res) => {
              if (res.data.package) {
                alert(
                  "Enrolled to a Package Successfully.Please Check Your Email. Your Package will not be activated until the funds have cleareded in our account."
                );
                window.location = "/dashboard";
              } else {
                alert("You have already enrolled to a package");
              }
            })
            .catch((err) => {
              alert("Unuccessfully");
              console.log(err);
            });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div class="container">
     

      <div class="row py-5 p-4 bg-white rounded shadow-sm">
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Instructions for buyer
          </div>
          <div class="p-4">
            <p class="font-italic mb-4">
              <ul>
                <li>
                  {" "}
                  Deposit money to our BOC bank or eZCash (+94 763631711, + 2.5%
                  commision for Dialog) account and email us the scanned bank
                  slip (Before 12 noon, to ship the package on the same day)
                </li>
                <li>
                  {" "}
                  You can also use Frimi or Genie payment methods by scanning
                  the QR codes from your mobile App.
                </li>
                <li>
                  After confirming your payment the package will be handed over
                  to a local courier service or post office
                </li>
              </ul>
            </p>
            <textarea
              name=""
              cols="30"
              rows="10"
              class="form-control"
            ></textarea>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
            Order summary{" "}
          </div>
          <div class="p-4">
            <p class="font-italic mb-4">
              
            </p>
            <form onSubmit={selectPackage}>
              <ul class="list-unstyled mb-4">
              

                <li class="d-flex justify-content-between py-3 border-bottom">
                  <strong class="text-muted">Total</strong>
                  <h5 class="font-weight-bold">{packagePrice} LKR</h5>
                </li>
              </ul>
              <button
                type="submit"
                class="btn btn-dark rounded-pill py-2 btn-block"
              >
                Procceed to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
