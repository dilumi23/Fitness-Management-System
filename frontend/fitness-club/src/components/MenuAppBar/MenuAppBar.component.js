import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

// @desc import Components

import UserLogin from "../Login/UserLogin/userlogin.component";
import Profile from "../Profile/profile";
import UserRegistration from "../Register/registration.component";
import ForgotPassword from "../ForgotPassword/forgotpassword.component";
import ProfileUpdate from "../ProfileUpdate/profileUpdate.component";
import AddTime from "../AddTime/addTime";

// @desc import Components

import HomeComponent from "../Home/homepage.component";
import Footer from "../../components/Footer/Footer.component";
import UserDashboard from "../User/Dashboard/UserDashboard/UserDashboard.component";
import BurnCalories from "../User/Forms/BurnCalories/burncalories";
import DailyMealPlanByUser from "../User/Dashboard/DailyMealPlanByUser/DailyMealPlanByUser.component";
import AddRequirementsToTheInstructor from "../User/Forms/AddRequirementsToTheInstructor/AddRequirementsToTheInstructor.component";
import AddWorkoutMealToDatabase from "../Instructor/AddWorkoutMealToDatabase/AddWorkoutMealToDatabase";
import AdminLogin from "../Admin/Login/adminlogin.component";
import AssignInstructor from "../Admin/AssignmentInstructor/assignInstructor.component";
import Assigninstructorform from "../Admin/AssignmentInstructor/form/assigninstructorform.component";
import InstructorLogin from "../Instructor/Login/instructorlogin.component";
import Instructor from "../Instructor/dashboard/instructor.component";
import Email from "../User/Email/email.component";

import Payment from "../Shop/Pages/cart/payment.component";
import VerifyUserProfile from "../Admin/VerifyUserProfile/verifyuserprofile.component";
import Assigneduserlist from "../Instructor/AssignedUserList/assigneduserlist.component";
import Viewuserprofile from "../Instructor/ViewUserProfile/viewuserprofile.component";

// @desc import Components



//import Item from "../Shop/Pages/Item/Item.component";

import MainCart from "../Shop/Pages/cart/maincart.component";

import Cartsuccess from "../Shop/Pages/cart/cartsuccess.component";

// @desc import Components

import InstructorManage from "../Admin/Dashboards/InstructorManage/instructorManage";
import InsertInstructor from "../Admin/Forms/InstructorManage/InsertInstructor";
import UpdateInstructor from "../Admin/Forms/InstructorManage/UpdateInstructor";
import InstructorList from "../Admin/Lists/InstructorList";
import InstructorProfile from "../Admin/Lists/InstructorProfile";
import Join from "../Admin/Chat/Join";
import Chat from "../Admin/Chat/Chat";

// @desc import Components

import InsertFeedback from "../Feedback/InsertFeedback/InsertFeedback.component";
import FeedbackTable from "../Feedback/FeedbackTable/FeedbackTable.component";

// @desc import Components

import InventoryGrid from "../Inventory/InventoryList/Inventory.component";
import InsertInventoryItems from "../Inventory/InsertItems/InsertInventoryItems.component";
import UpdateInventoryItems from "../Inventory/UpdateItems/UpdateInventoryItems";

// @desc import Components

import RequestedPlansTable from "../Instructor/UserRequirements/userrequirement";
import UserPlan from "../Instructor/forms/userforms";
import ViewMealWorkoutPlan from "../Instructor/ViewMealWorkoutPlan/ViewMealWorkoutPlan.component";
import UpdateMealWorkoutPlan from "../Instructor/updatemealworkoutplan/updatemealworkoutplan.component";
import ArticleList from "../FitnessUpdates/ArticlesList/ArticleList.component";
import InsertFitnessUpdate from "../FitnessUpdates/InsertFitnessUpdate/InsertFitnessUpdate.component";
import updateFitnessUpdate from "../FitnessUpdates/UpdateFitnessUpdate/updatefitnessupdate.component";
import FitnessUpdatesTable from "../FitnessUpdates/FitnessUpdatesTable/FitnessUpdatesTable.component";

//@desc import components

// import InsertGymPackages from "../GymPackages/InsertPackages/InsertGymPackages.component";
// import UpdateGymPackage from "../GymPackages/UpdateGymPackages/UpdateGymPackage.component";
// import DeleteGymPackage from "../GymPackages/DeletePackage/DeleteGymPackage.component";
import InsertNotice from "../GymNotices/InsertNotice/InsertNotice.component";
import UpdateNotice from "../GymNotices/UpdateNotice/UpdateNotice.component";
// import DeleteNotice from "../GymNotices/DeleteNotice/DeleteNotice.component";
// import PackageDetails from "../GymPackages/PackageDetailsTable/PackageDetails.component";
// import NoticesTable from "../GymNotices/GymNoticesTable/NoticesTable.component";
// import GymPackageGrid from "../GymPackages/GymPackageGrid/GymPackageGrid.component";

//@desc import components


import ManageGymPackage from "../GymPackages/ManageGymPackages/ManageGymPackage.component";
import ManageNotice from "../GymNotices/ManageNotice/ManageNotice.component";
import PackageDetails from "../GymPackages/PackageDetailsTable/PackageDetails.component";
import NoticesTable from "../GymNotices/GymNoticesTable/NoticesTable.component";
import Packages from "../Packages/Packages.component";
import PaymentDetails from "../Packages/PaymentDetails.component";

// @desc import Components

import AboutUs from "../AboutUs/aboutus.component";

export default function MenuAppBar() {
  const [token, setToken] = useState(null);
  const [username, setUserName] = useState("Guest");
  const [userImage, setUserImage] = useState(
    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
  );
  const [role, setRole] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("x-auth-token");
    const userRole = localStorage.getItem("userRole");
    setToken(userToken);
    setRole(userRole);

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/auth", config)
      .then((res) => {
        setRole("user");
        setUserName(res.data.firstName + " " + res.data.lastName);
        if (res.data.profImage) {
          setUserImage(res.data.profImage);
        }
      })
      .catch(() => {
        axios
          .get(process.env.REACT_APP_BACKEND_URL + "/api/authadmin", config)
          .then((res) => {
            setUserName(res.data.firstName + " " + res.data.lastName);
            setRole("admin");
            if (res.data.profImage) {
              setUserImage(res.data.profImage);
            }
          })
          .catch(() => {
            axios
              .get(
                process.env.REACT_APP_BACKEND_URL + "/api/authinstructor",
                config
              )
              .then((res) => {
                setUserName(res.data.name);
                setRole("instructor");
              });
          });
      });
  }, []);

  return (
    <Router>
      <div id="wrapper">
        <nav
          style={{
            backgroundImage: "linear-gradient(to bottom, #064564, #73b3fb)",
          }}
          className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion p-0"
        >
          <div className="container-fluid d-flex flex-column p-0">
            <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
              <div className="sidebar-brand-icon logo-Desktop">
                <img
                  alt="logo"
                  className="rounded-circle"
                  src="/assets/img/logo/logoicon.png"
                  width="50px"
                />
                {/* <i className="fas fa-laugh-wink"></i> */}
              </div>

              <div className="sidebar-brand-text mx-3">
                <span>
                  <img
                    alt="logo"
                    className="rounded-circle"
                    src="/assets/img/logo/logoname.png"
                    width="100px"
                  />
                </span>
              </div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <ul className="nav navbar-nav text-light" id="accordionSidebar">
              {token === null ? (
                <>
                  {" "}
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/">
                      <i className="fas fa-home"></i>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="userlogin">
                      <i className="far fa-user-circle"></i>
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/registration">
                      <i className="fas fa-user-circle"></i>
                      <span>Register</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Packages">
                      <i className="fas fa-box"></i>
                      <span>Packages</span>
                    </Link>
                  </li>
                  
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/articlelist">
                      <i className="fas fa-newspaper"></i>
                      <span>Fitness Updates</span>
                    </Link>
                  </li>{" "}
                </>
              ) : role === "user" ? (
                <>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/">
                      <i className="fas fa-home"></i>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/dashboard">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="profile">
                      <i className="fas fa-user"></i>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/Packages">
                      <i className="fas fa-box"></i>
                      <span>Packages</span>
                    </Link>
                  </li>
                  
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/articlelist">
                      <i className="fas fa-ad"></i>
                      <span>Fitness Updates</span>
                    </Link>
                  </li>
                 
                  
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/InsertFeedback">
                      <i class="fas fa-check-circle"></i>
                      <span>InsertFeedback </span>
                    </Link>
                  </li>
                  {" "}
                </>
              ) : role === "admin" ? (
                <>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/">
                      <i className="fas fa-home"></i>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/admin">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/">
                      <i className="fas fa-home"></i>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/instructor">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>Instructor Dashboard</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="text-center d-none d-md-inline">
              <button
                className="btn rounded-circle border-0"
                id="sidebarToggle"
                type="button"
              ></button>
            </div>
          </div>
        </nav>

        {/* Header Nav bar  */}
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
              <div className="container-fluid">
                <button
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  id="sidebarToggleTop"
                  type="button"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <form className="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input
                      className="bg-light form-control border-0 small"
                      type="text"
                      placeholder="Search for ..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary py-0" type="button">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="nav navbar-nav flex-nowrap ml-auto">
                  <li className="nav-item dropdown d-sm-none no-arrow">
                    <Link
                      className="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-search"></i>
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right p-3 animated--grow-in"
                      role="menu"
                      aria-labelledby="searchDropdown"
                    >
                      <form className="form-inline mr-auto navbar-search w-100">
                        <div className="input-group">
                          <input
                            className="bg-light form-control border-0 small"
                            type="text"
                            placeholder="Search for ..."
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary py-0"
                              type="button"
                            >
                              <i className="fas fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>

                  <div className="d-none d-sm-block topbar-divider"></div>
                  <li
                    className="nav-item dropdown no-arrow"
                    role="presentation"
                  >
                    <div className="nav-item dropdown no-arrow">
                      <Link
                        className="dropdown-toggle nav-link"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="d-none d-lg-inline mr-2 text-gray-600 small">
                          {username}
                        </span>
                        <img
                          alt="profileimage"
                          className="border rounded-circle img-profile"
                          src={userImage}
                        />
                      </Link>
                      <div
                        className="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                        role="menu"
                      >
                        {token === null ? (
                          <>
                            <Link
                              to="registration"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Register
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link
                              to="/userlogin"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Login
                            </Link>
                          </>
                        ) : role === "user" ? (
                          <>
                            <Link
                              to="/profile"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Profile
                            </Link>
                            <Link
                              to="/dashboard"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Dashboard
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link
                              onClick={() => {
                                localStorage.removeItem("x-auth-token");
                                window.location = "/";
                              }}
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Logout
                            </Link>
                          </>
                        ) : role === "admin" ? (
                          <>
                            <Link
                              to="/admin"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Dashboard
                            </Link>
                            <Link
                              onClick={() => {
                                localStorage.removeItem("x-auth-token");
                                window.location = "/";
                              }}
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Logout
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/admin"
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Instructor
                            </Link>
                            <Link
                              onClick={() => {
                                localStorage.removeItem("x-auth-token");
                                window.location = "/";
                              }}
                              className="dropdown-item"
                              role="presentation"
                            >
                              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                              &nbsp;Logout
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="container-fluid">
              {/* Routes
               */}
              {/* <Route path="/forgotpassword" exact component={ForgotPassword} /> */}
              <Route path="/registration" exact component={UserRegistration} />
              <Route path="/profileUpdate" exact component={ProfileUpdate} />
              <Route path="/userlogin" exact component={UserLogin} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/forgotpassword" exact component={ForgotPassword} />
              <Route path="/addTime" exact component={AddTime} />

              {/* Routes
              @author Dilumi */}
              <Route path="/" exact component={HomeComponent} />
              <Route path="/dashboard" exact component={UserDashboard} />
              <Route
                path="/addcompletedexerciselist"
                exact
                component={BurnCalories}
              />
              <Route
                path="/adddailymeal"
                exact
                component={DailyMealPlanByUser}
              />
              <Route
                path="/requestplan"
                exact
                component={AddRequirementsToTheInstructor}
              />
              <Route
                path="/addworkoutmeal"
                exact
                component={AddWorkoutMealToDatabase}
              />
              <Route path="/adminlogin" exact component={AdminLogin} />
              <Route
                path="/AssignInstructor"
                exact
                component={AssignInstructor}
              />
              <Route
                path="/assigninstructorform/:id"
                exact
                component={Assigninstructorform}
              />
              <Route
                path="/instructorlogin"
                exact
                component={InstructorLogin}
              />
              <Route path="/instructor" exact component={Instructor} />

              <Route path="/email" exact component={Email} />

              <Route path="/PaymentCart" exact component={Payment} />

              <Route
                path="/verifyuserprofile"
                exact
                component={VerifyUserProfile}
              />
              <Route
                path="/assigneduserlist"
                exact
                component={Assigneduserlist}
              />
              <Route
                path="/viewuserprofile"
                exact
                component={Viewuserprofile}
              />
              {/* Routes
              */}
              
              <Route path="/cart" exact component={MainCart} />
              
               
             
              
             
              <Route path="/Cartsuccess" exact component={Cartsuccess} />
              {/* Routes
              @author Dilumi */}
              <Route path="/inventorytable" exact component={InventoryGrid} />
              <Route
                path="/addinventoryitems"
                exact
                component={InsertInventoryItems}
              />
              <Route
                path="/UpdateInventoryitems"
                exact
                component={UpdateInventoryItems}
              />
              {/* Routes
              */}
              <Route path="/userforms/:id" exact component={UserPlan} />
              <Route
                path="/userrequirement"
                exact
                component={RequestedPlansTable}
              />
              <Route
                path="/viewmealworkout"
                exact
                component={ViewMealWorkoutPlan}
              />
              <Route
                path="/updatemealworkoutplan"
                exact
                component={UpdateMealWorkoutPlan}
              />
              <Route path="/articlelist" exact component={ArticleList} />
              <Route
                path="/insertFitnessUpdate"
                exact
                component={InsertFitnessUpdate}
              />
              <Route
                path="/updateFitnessUpdate"
                exact
                component={updateFitnessUpdate}
              />
              <Route
                path="/FitnessUpdatesTable"
                exact
                component={FitnessUpdatesTable}
              />
              {/* Routes
              */}
              <Route path="/admin" exact component={InstructorManage} />
              <Route path="/insert" exact component={InsertInstructor} />
              <Route path="/update/:id" exact component={UpdateInstructor} />
              <Route path="/list" exact component={InstructorList} />
              <Route path="/view/:id" exact component={InstructorProfile} />
              <Route path="/join" exact component={Join} />
              <Route path="/chat" component={Chat} />
              {/* Routes
               */}
              <Route path="/InsertFeedback" exact component={InsertFeedback} />
              <Route path="/FeedbackTable" exact component={FeedbackTable} />
              <Route path="/ManageNotice" exact component={ManageNotice} />
              <Route path="/UpdateNotice" exact component={UpdateNotice} />
              <Route path="/PackageDetails" exact component={PackageDetails} />
              <Route path="/NoticesTable" exact component={NoticesTable} />
              <Route path="/Packages" exact component={Packages} />
              <Route path="/Payment" exact component={PaymentDetails} />
              {/* Routes
              @author public */}
              <Route path="/aboutUs" exact component={AboutUs} />
            </div>
          </div>

          <Footer />
        </div>
        <a class="border rounded d-inline scroll-to-top" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>
      </div>
    </Router>
  );
}
