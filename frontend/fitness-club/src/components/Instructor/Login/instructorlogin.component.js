import React, { Component } from "react";
import { Link } from "react-router-dom";
import Background from "./image/pic2.jpg";
import axios from "axios";

export default class InstructorLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      response: "",
      userToken: "",
    };
  }

  componentDidMount() {
    //reset the state after 9 seconds
    this.interval = setInterval(() => this.setState({ response: "" }), 7000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    try {
      const loginDetails = {
        email: this.state.email,
        password: this.state.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const loginResponse = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/authinstructor",
        loginDetails,
        config
      );
      const setUserData = {
        token: loginResponse.data.token,
        user: loginResponse.data.user,
        err: loginResponse.data.error,
      };

      localStorage.setItem("x-auth-token", setUserData.token);
      localStorage.setItem("userRole", "admin");
      window.location = "/instructor";
    } catch (err) {
      console.log(err);
      if (!this.state.userToken) {
        this.setState({
          response: "username or password is invalid",
        });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                      className="flex-grow-1 bg-login-image"
                      style={{
                        // border: "2px solid blue",
                        backgroundImage: `url(${Background})`,
                        backgroundRepeat:
                          "no-repeat" /* Do not repeat the image*/,
                        backgroundSize: "cover",
                        boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h6 style={{ color: "red" }}>{this.state.response}</h6>
                        <h4 className="text-dark mb-4">
                          Welcome Back! | Instructor{" "}
                        </h4>
                      </div>
                      <form className="user" onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="exampleInputEmail"
                            placeholder="Email"
                            aria-describedby="emailHelp"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </div>

                        <button
                          className="btn btn-primary btn-block text-white btn-user"
                          type="submit"
                        >
                          Login
                        </button>
                      </form>
                      <div className="text-center">
                        <Link className="small" to="forgotpassword">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="registration">
                          Create an Account!
                        </Link>
                      </div>
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
