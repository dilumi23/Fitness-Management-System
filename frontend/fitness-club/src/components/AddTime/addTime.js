import React, { Component } from "react";
import axios from "axios";

export default class AddTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      inTime: "",
      outTime: "",
      gymTime: [],
      searchTime: "",
    };

    this.addTime = this.addTime.bind(this);
    this.generatePDF = this.generatePDF.bind(this);
    //this.gymUserTimeFunction = this.gymUserTimeFunction.bind(this);
  }

  //fetching gym time List data from the backend
  componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile/me", config)
      .then(({ data }) => {
        console.log("gymTimeList: " + data.time);
        console.log(data.time.length);

        if (data.time.length > 0) {
          this.setState({
            gymTime: data.time,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generatePDF(e) {
    e.preventDefault();

    const pdfText = {
      gymTime: this.state.gymTime,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/pdfgenerate/generateusergymtime",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  gymUserTimeFunction() {
    //return a single Instructor component for each and every array Element
    return this.state.gymTime.map((currentUserGymTime) => {
      return (
        <tr>
          <td>{currentUserGymTime.date}</td>
          <td>{currentUserGymTime.inTime}</td>
          <td>{currentUserGymTime.outTime}</td>
        </tr>
      );
    });
  }

  addTime(e) {
    e.preventDefault();
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    const Time = {
      inTime: this.state.inTime,
      outTime: this.state.outTime,
      date: this.state.date,
    };

    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/time/addgymusertime",
        Time,
        config
      )
      .then((response) => {
        alert("Gym Time Added");
        this.setState({
          inTime: "",
          outTime: "",
          date: "",
        });

        window.location = "/addTime";
      })
      .catch((error) => {
        console.log(error);
        alert("You need to select a gym package");
      });
  }

  render() {
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
                          this.setState({
                            searchTime: e.target.value.substring(0, 10),
                          });
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
                          <th>Date</th>
                          <th>Gym In Time</th>
                          <th>Gym Out Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //return a single feedback component for each and every array Element
                          this.state.gymTime.map((currentTime) => {
                            if (
                              this.state.searchTime ==
                              currentTime.date.substring(0, 10)
                            )
                              return (
                                <tr>
                                  <td>{currentTime._id}</td>
                                  <td>{currentTime.inTime}</td>
                                  <td>{currentTime.outTime}</td>
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
        <div>
          <form class="time">
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label for="inTime">
                    <strong>Date</strong>
                  </label>
                  <input
                    class="form-control"
                    type="date"
                    placeholder="Date"
                    // value={this.state.date}
                    name="date"
                    onChange={(e) => {
                      this.setState({
                        date: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="inTime">
                    <strong>In Time</strong>
                  </label>
                  <input
                    class="form-control"
                    type="time"
                    placeholder="In Time"
                    // value={this.state.inTime}
                    name="inTime"
                    onChange={(e) => {
                      this.setState({
                        inTime: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="outTime">
                    <strong> Out Time</strong>
                  </label>
                  <input
                    class="form-control"
                    type="time"
                    placeholder="Out Time"
                    value={this.state.outTime}
                    onChange={(e) => {
                      this.setState({
                        outTime: e.target.value,
                      });
                    }}
                    name="outTime"
                  />
                </div>
              </div>
            </div>
            <center>
              <div class="mb-3">
                {/* <!-- search feedback modal --> */}
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target=".bd-example-modal-xl"
                  style={{ margin: "10px" }}
                >
                  search by date
                </button>
                <button
                  class="btn btn-primary btn-sm"
                  type="button"
                  onClick={this.generatePDF}
                  style={{ margin: "10px" }}
                >
                  Generate Report
                </button>{" "}
                <button
                  class="btn btn-primary btn-sm"
                  type="button"
                  onClick={this.addTime}
                  style={{ margin: "10px" }}
                >
                  Add
                </button>
              </div>
            </center>
          </form>
        </div>

        <div>
          <hr />
          <h3>Time Info</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>In Time</th>
                <th>Out Time</th>
              </tr>
            </thead>

            <tbody>{this.gymUserTimeFunction()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
