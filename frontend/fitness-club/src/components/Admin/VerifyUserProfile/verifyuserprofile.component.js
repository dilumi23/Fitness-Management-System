import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import emailjs from "emailjs-com";
import $ from "jquery";

const OrderPayments = (props) => (
  <tr>
    <td>{props.order._id}</td>
    <td>{props.order.user.firstName + " " + props.order.user.lastName}</td>
    <td>{props.order.user.email}</td>
    <td>{props.order.package}</td>
    <td>
      {" "}
      <button
        className="btn btn-outline-success"
        onClick={() => {
          props.completeOrderPayment(
            props.order._id,
            props.order.user.firstName,
            props.order.user.email
          );
        }}
      >
        Verify Package
      </button>
    </td>
  </tr>
);

// const SingleOrderPayments = (props) => (
//   <tr>
//     <td>{props.order._id}</td>
//     <td>{props.order.user.firstName + " " + props.order.user.lastName}</td>
//     <td>{props.order.user.email}</td>
//     <td>{props.order.package}</td>

//     <td>
//       {" "}
//       <form></form>
//       <button
//         onClick={() => {
//           props.completeOrderPayment(
//             props.order._id,
//             props.order.user.firstName,
//             props.order.user.email
//           );
//         }}
//       >
//         Verify Package
//       </button>
//     </td>
//   </tr>
// );

export default class VerifyUserProfile extends Component {
  constructor(props) {
    super(props);

    this.generatePDF = this.generatePDF.bind(this);

    //this.deleteInstructor = this.deleteInstructor.bind(this);
    //this.searchOrder = this.searchOrder.bind(this);

    this.state = {
      userGymPackageVerifyRequest: [],
      checkState: false,
      orderID: "",
      singleOrder: "false",

      //state for single order details
      SingleUserGymPackageVerifyRequest: null,
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile")
      .then((response) => {
        this.setState({ userGymPackageVerifyRequest: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generatePDF() {
    const pdfText = {
      userGymPackageVerifyRequest: this.state.userGymPackageVerifyRequest,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/pdfgenerate/generateincompletedgymorderlist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  completeOrderPayment(id, customer, email) {
    const PackageDetials = {
      verify: "yes",
    };

    // alert(id);
    // alert(email);
    // alert(customer);

    var formData = new FormData();
    formData.append("service_id", "gmail");
    formData.append("template_id", "template_0zihe5q");
    formData.append("user_id", "user_DhIeLbwU5Tqi2wCHTnphz");
    formData.append("email", email);
    formData.append("customer", customer);

    // $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
    //   type: "POST",
    //   data: formData,
    //   contentType: false, // auto-detection
    //   processData: false, // no need to parse formData to string
    // })
    //   .done(function () {
    //     alert("Your mail is sent!");

        //enroll to a package send data to package
        axios
          .post(
            process.env.REACT_APP_BACKEND_URL +
              "/api/profile/verifygympayment/" +
              id,
            PackageDetials
          )
          .then((res) => {
            if (res.data.package) {
              alert("Verify User Gym Package Successfully");
              window.location = "/verifyuserprofile";
            } else {
              alert("You have already enrolled to a package");
            }
          })
          .catch((err) => {
            alert("Unuccessfully");
            console.log(err);
          });
      //}
      //)
      // .fail(function (error) {
      //   alert("Oops... " + JSON.stringify(error));
      // });
  }

  // searchOrder(e) {
  //   e.preventDefault();

  //   //lert(this.state.orderID);
  //   //get single order from payment table
  //   axios
  //     .get(
  //       process.env.REACT_APP_BACKEND_URL +
  //         "/api/profile/user/" +
  //         this.state.orderID
  //     )
  //     .then((response) => {
  //       this.setState({
  //         SingleUserGymPackageVerifyRequest: response.data,
  //         singleOrder: "true",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  VerifyList() {
    //return a single Instructor component for each and every array Element
    return this.state.userGymPackageVerifyRequest.map((currentRequest) => {
      if (currentRequest.subscriptionDate == null) {
        return (
          <OrderPayments
            order={currentRequest}
            completeOrderPayment={this.completeOrderPayment}
            key={currentRequest._id}
          />
        );
      }
    });
  }

  // getSingleOrder() {
  //   //return a single Instructor component for each and every array Element

  //   return (
  //     <SingleOrderPayments
  //       order={this.state.SingleUserGymPackageVerifyRequest}
  //       completeOrderPayment={this.completeOrderPayment}
  //       key={this.state.SingleUserGymPackageVerifyRequest._id}
  //     />
  //   );
  // }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.generatePDF}>
          Generate PDF
        </button>
        <br />
        <br />
        {/* <div className="row">
          <div className="col-md-9">
            <input
              class="form-control"
              type="text"
              onChange={(e) => {
                this.setState({
                  orderID: e.target.value,
                });
              }}
              placeholder="Search Order ID"
              aria-label="Search"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.searchOrder}>
              search
            </button>
          </div>
        </div> */}
        <br /> <br />
        <h3>Verify User Gym Package Request List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Profile ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>{this.VerifyList()}</tbody>
        </table>
      </div>
    );
  }
}
