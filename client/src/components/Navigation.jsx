import "./General.css"
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div className="title">
            <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/">WE WANT ELO</a>
            </nav>
          </div>
          <div className="navcontainer">
            <div className="navhome">
              <button class="homebtn">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              </button>
              </div>

              <div className="navcreatelisting">
              <button class="createlistingnavbtn">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/CreateListing" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/CreateListing">
                  Create listing
                </Link>
              </li>
              </button>
              </div>
              <div className="navlogin">
              <button class="loginbtn">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/LoginPage" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/LoginPage">
                  Login
                </Link>
              </li>
              </button>
              </div>

        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);