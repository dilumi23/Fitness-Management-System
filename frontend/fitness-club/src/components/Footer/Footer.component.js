import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <Router>
      <footer class="page-footer">
        <div class="container">
          <div class="footer-legal">
            <div class="float-md-right region">
              <Link to="#">
                <img alt="logo" width="30" src="assets/img/logo/logoicon.png" />
                <span style={{ fontWeight: "bold" }}>Fitness Club</span>
              </Link>
            </div>
            <div class="d-inline-block copyright">
              <p class="d-inline-block">
                Copyright © 2022. All rights reserved.
                <br />
              </p>
            </div>
            <div class="d-inline-block legal-links">
              <div class="d-inline-block item">
                <h5>Privacy Policy</h5>
              </div>
              <div class="d-inline-block item">
                <h5>Terms of Use</h5>
              </div>
              <div class="d-inline-block item">
                <h5>Legal</h5>
              </div>
              <div class="d-inline-block item">
                <h5>License</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default Footer;
