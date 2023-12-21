/*
 *
 * @desc Feedback List Table
 *
 */

import React, { Component } from "react";
import axios from "axios";

export default class AddTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbacks: [],
      searchFeedback: "",
    };

    this.generatePDF = this.generatePDF.bind(this);
  }

  //fetching gym time List data from the backend
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/feedback")
      .then(({ data }) => {
        console.log("feedbacks: " + data);
        console.log(data.length);

        if (data.length > 0) {
          this.setState({
            feedbacks: data,
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
      feedbacks: this.state.feedbacks,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/pdfgenerate/generatfeedbacks",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  displayFunction() {
    //return a single Instructor component for each and every array Element
    return this.state.feedbacks.map((currentFeedback) => {
      return (
        <tr>
          <td>{currentFeedback.createdAt}</td>
          <td>{currentFeedback._id}</td>
          <td>{currentFeedback.GymAppearance}</td>
          <td>{currentFeedback.ActivitiesQuality}</td>
          <td>{currentFeedback.QualityOfStaff}</td>
          <td>{currentFeedback.Overall}</td>
        </tr>
      );
    });
  }

  render() {
    return (
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
                          searchFeedback: e.target.value.substring(0, 10),
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
                        <th>Feedback ID</th>
                        <th>Gym Appearance</th>
                        <th>Quality of Activities</th>
                        <th>Quality Of Staff</th>
                        <th>Overall Satisfaction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        //return a single feedback component for each and every array Element
                        this.state.feedbacks.map((currentFeedback) => {
                          if (
                            this.state.searchFeedback ==
                            currentFeedback.createdAt.substring(0, 10)
                          )
                            return (
                              <tr>
                                <td>{currentFeedback._id}</td>
                                <td>{currentFeedback.GymAppearance}</td>
                                <td>{currentFeedback.ActivitiesQuality}</td>
                                <td>{currentFeedback.QualityOfStaff}</td>
                                <td>{currentFeedback.Overall}</td>
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
        <div>
          <hr />
          <h3>Feedbacks</h3>
          <br />
          <button
            className="btn btn-primary"
            onClick={this.generatePDF}
            style={{ margin: "10px" }}
          >
            Generate Report
          </button>

          {/* <!-- search feedback modal --> */}
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            style={{ margin: "10px" }}
          >
            search by date
          </button>

          <br />
          <br />
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Feedback ID</th>
                <th>Gym Appearance</th>
                <th>Quality of Activities</th>
                <th>Quality Of Staff</th>
                <th>Overall Satisfaction</th>
              </tr>
            </thead>

            <tbody>{this.displayFunction()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
