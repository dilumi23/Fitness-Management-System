import React, { Component } from "react";

import "./GymPackageGrid.css";

export default class GymPackageGrid extends Component {
  render() {
    return (
      <div>
        <div className="row">
          {/* Gym Package 1 */}
          <div className="col-lg-3 col-md-6">
            <figure class="snip1527">
              <div class="image">
                <img src="./assets/img/packages/1.jpg" alt="pr-sample23" />
              </div>
              <figcaption>
                <div class="date">
                  <span class="day">3500</span>
                  <span class="month">LKR</span>
                </div>
                <h3>Gold Package</h3>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                  can't be cool if you don't have an attitude.
                </p>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>

          {/* Gym Package 2 */}
          <div className="col-lg-3 col-md-6">
            <figure class="snip1527">
              <div class="image">
                <img src="./assets/img/packages/2.jpg" alt="pr-sample25" />
              </div>
              <figcaption>
                <div class="date">
                  <span class="day">2500</span>
                  <span class="month">LKR</span>
                </div>
                <h3>Silver Package</h3>
                <p>
                  I don't need to compromise my principles, because they don't
                  have the slightest bearing on what happens to me anyway.
                </p>
                <p>the slightest bearing on what happens to me anyway.</p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>

          {/* Gym Package 3 */}
          <div className="col-lg-3 col-md-6">
            <figure class="snip1527">
              <div class="image">
                <img src="./assets/img/packages/3.jpg" alt="pr-sample25" />
              </div>
              <figcaption>
                <div class="date">
                  <span class="day">1500</span>
                  <span class="month">LKR</span>
                </div>
                <h3>Bronze Package</h3>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                  can't be cool if you don't have an attitude.
                </p>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>

          {/* Gym Package 4*/}
          <div className="col-lg-3 col-md-6">
            <figure class="snip1527">
              <div class="image">
                <img src="./assets/img/packages/4.jpg" alt="pr-sample25" />
              </div>
              <figcaption>
                <div class="date">
                  <span class="day">1500</span>
                  <span class="month">LKR</span>
                </div>
                <h3>Bronze Package</h3>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                  can't be cool if you don't have an attitude.
                </p>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}
