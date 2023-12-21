import React from "react";

import CustomizedTimeline from "./hometimeline.component";
import CustomizedSteppers from "./stepper.component";

import "./homepage.css";

export default function HomeComponent() {
  return (
    <div>
      {/* Image Slider */}
      <section id="carousel">
        <div class="carousel slide" data-ride="carousel" id="carousel-1">
          <div class="carousel-inner" role="listbox">
            <div class="carousel-item">
              <div class="jumbotron pulse animated hero-nature carousel-hero">
                <h1 class="hero-title">Online Store</h1>
                <p class="hero-subtitle">
                  For each of those gym lovers out there, are you tired of
                  visiting stores for sports wear?Then here is the solution...
                </p>
                <p>
                  <a
                    class="btn btn-primary hero-button plat"
                    role="button"
                    href="/shop"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div class="jumbotron pulse animated hero-photography carousel-hero">
                <h1 class="hero-title">Packages</h1>
                <p class="hero-subtitle">
                  Packages are the best bet if you’re still experimenting or if
                  life is a bit too complicated right now for you to commit.
                </p>
                <p>
                  <a
                    class="btn btn-primary hero-button plat"
                    role="button"
                    href="/Packages"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div class="carousel-item active">
              <div class="jumbotron pulse animated hero-technology carousel-hero">
                <h1 class="hero-title">About Us</h1>
                <p class="hero-subtitle">
                  Providing a quality healthcare service and giving our members
                  control over their health is paramount at Fitness Club.
                </p>
                <p>
                  <a
                    class="btn btn-primary hero-button plat"
                    role="button"
                    href="/"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div>
            <a
              class="carousel-control-prev"
              href="#carousel-1"
              role="button"
              data-slide="prev"
            >
              <i class="fa fa-chevron-left"></i>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel-1"
              role="button"
              data-slide="next"
            >
              <i class="fa fa-chevron-right"></i>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <ol class="carousel-indicators">
            <li data-target="#carousel-1" data-slide-to="0"></li>
            <li data-target="#carousel-1" data-slide-to="1"></li>
            <li data-target="#carousel-1" data-slide-to="2" class="active"></li>
          </ol>
        </div>
      </section>
      {/* End of Image Slider */}

      {/*  Services Section */}
      <center>
        <div>
          <div class="container">
            <div class="row row-fitur">
              <div class="col-sm-4 col-md-4 waves-effect kolom-a">
                <div class="fitur-a">
                  <img
                    src="assets/img/gym%20(1).png"
                    style={{ width: "150px" }}
                    alt="imageHome"
                  />
                </div>
                <div class="separator-fitur"></div>
                <div>
                  <h4 class="heading-fitur">New Equipment </h4>
                  <p class="paragraf-fitur">
                    New Equipment Digest delivers the latest industrial product
                    information, market trends and manufacturing news to print
                    and digital readers in tens-of-thousands of facilities
                  </p>
                </div>
              </div>
              <div class="col-sm-4 col-md-4 waves-effect kolom-b">
                <div class="fitur-a">
                  <img
                    src="assets/img/dumbell.png"
                    style={{ width: "150px" }}
                    alt="imageHome"
                  />
                </div>
                <div class="separator-fitur"></div>
                <div>
                  <h4 class="heading-fitur">Personalized Free Workouts </h4>
                  <p class="paragraf-fitur">
                    Trainers also measure their client’s strengths and
                    weaknesses with fitness assessments. These fitness
                    assessments may also be performed before and after an
                    exercise program. Each member will get personalized workouts
                  </p>
                </div>
              </div>
              <div class="col-sm-4 col-md-4 waves-effect kolom-c">
                <div class="fitur-a">
                  <img
                    src="assets/img/heart.png"
                    style={{ width: "150px" }}
                    alt="imageHome"
                  />
                </div>
                <div class="separator-fitur"></div>
                <div>
                  <h4 class="heading-fitur">Fully Passion </h4>
                  <p class="paragraf-fitur">
                    Instructors at Fitness Club are qualified and trained. Our
                    #1 goal as a team is to help you reach your fitness goals
                    while providing you with the most effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
      {/* End of Services Section */}

      {/* <div className="container">
        <div style={{ margin: "50px 0px" }}>
          <CustomizedSteppers />
        </div>
      </div> */}

      <div className="container">
        <div style={{ margin: "50px 0px" }}>
          <CustomizedTimeline />
        </div>
      </div>

      {/* Image Grid */}
      <center>
        <h3>Meet Your Tribe</h3>
        <h1>#TougherTogether</h1>
      </center>
      <div className="container" style={{ marginTop: "30px" }}>
        <div class="row flex-box flex-wrap-wrap">
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people1.jpeg"
              alt="imageHome"
            />
          </div>
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people2.jpeg"
              alt="imageHome"
            />
          </div>
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people3.jpeg"
              alt="imageHome"
            />
          </div>
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people4.jpeg"
              alt="imageHome"
            />
          </div>
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people5.jpeg"
              alt="imageHome"
            />
          </div>
          <div class="col-sm-4 flex-box flex-justify-center flex-align-center HomePageImageCard">
            <img
              class="img-fluid"
              src="assets/img/people6.jpeg"
              alt="imageHome"
            />
          </div>
        </div>
      </div>
      {/* End of Image Grid */}

      {/* Customer Feedbacks */}
      {/* <!-- Section: Team v.1 --> */}
      <section
        class="team-section text-center my-5"
        style={{ padding: "50px" }}
      >
        {/* 
  <!-- Section heading --> */}
        <h2 class="h1-responsive font-weight-bold my-5">Our amazing team</h2>
        {/* <!-- Section description --> */}
        <p class="grey-text w-responsive mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
          amet numquam iure provident voluptate esse quasi, veritatis totam
          voluptas nostrum quisquam eum porro a pariatur veniam.
        </p>

        {/* <!-- Grid row --> */}
        <div class="row">
          {/* <!-- Grid column --> */}

          <div class="col-lg-4 col-md-4 mb-lg-0 mb-5 ">
            <div className="container HomePageImageCardTeam">
              <div class="avatar mx-auto">
                <img
                  src="https://cache.desktopnexus.com/thumbseg/2487/2487414-bigthumbnail.jpg"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  class="rounded-circle z-depth-1"
                  alt="Sample avatar"
                />
              </div>
              <h5 class="font-weight-bold mt-4 mb-3">Jayanath Fernando</h5>
              <p class="text-uppercase blue-text">
                <strong>Gym Owner</strong>
              </p>
              <p class="grey-text">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci sed quia non numquam modi tempora eius.
              </p>
              <ul class="list-unstyled mb-0">
                {/* <!-- Facebook --> */}
                <a class="p-2 fa-lg fb-ic">
                  <i class="fab fa-facebook-f blue-text"> </i>
                </a>

                {/* <!-- Instagram --> */}
                <a class="p-2 fa-lg ins-ic">
                  <i class="fab fa-instagram blue-text"> </i>
                </a>
              </ul>
            </div>
          </div>
          {/* <!-- Grid column -->

    {/* <!-- Grid column --> */}
          <div class="col-lg-4 col-md-4 mb-lg-0 mb-5">
            <div className="container HomePageImageCardTeam">
              <div class="avatar mx-auto">
                <img
                  src="https://previews.123rf.com/images/bowie15/bowie151209/bowie15120900099/15662439-man-in-profile.jpg"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                  class="rounded-circle z-depth-1"
                  alt="Sample avatar"
                />
              </div>
              <h5 class="font-weight-bold mt-4 mb-3">Raj Perera</h5>
              <p class="text-uppercase blue-text">
                <strong>Instructor</strong>
              </p>
              <p class="grey-text">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci sed quia non numquam modi tempora eius.
              </p>
              <ul class="list-unstyled mb-0">
                {/* <!-- Facebook --> */}
                <a class="p-2 fa-lg fb-ic">
                  <i class="fab fa-facebook-f blue-text"> </i>
                </a>

                {/* <!-- Instagram --> */}
                <a class="p-2 fa-lg ins-ic">
                  <i class="fab fa-instagram blue-text"> </i>
                </a>
              </ul>
            </div>
          </div>
          {/* <!-- Grid column -->

   

    {/* <!-- Grid column --> */}
          <div class="col-lg-4 col-md-4 mb-lg-0 mb-5">
            <div className="container HomePageImageCardTeam">
              <div class="avatar mx-auto">
                <img
                  src="https://i.pinimg.com/236x/3f/d0/d5/3fd0d516192d8a342ea8fd1cb9a63a01--street-style-fashion-fashion-looks.jpg"
                  class="rounded-circle z-depth-1"
                  alt="Sample avatar"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h5 class="font-weight-bold mt-4 mb-3">Stephen Williams</h5>
              <p class="text-uppercase blue-text">
                <strong>Instructor</strong>
              </p>
              <p class="grey-text">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci sed quia non numquam modi tempora eius.
              </p>
              <ul class="list-unstyled mb-0">
                {/* <!-- Facebook --> */}
                <a class="p-2 fa-lg fb-ic">
                  <i class="fab fa-facebook-f blue-text"> </i>
                </a>

                {/* <!-- Instagram --> */}
                <a class="p-2 fa-lg ins-ic">
                  <i class="fab fa-instagram blue-text"> </i>
                </a>
              </ul>
            </div>
          </div>
          {/* <!-- Grid column --> */}
        </div>
      </section>
      {/* <!-- Section: Team v.1 --> */}
      {/* <CustomerReviews /> */}

      {/* End of Customer Feedbacks */}
    </div>
  );
}
