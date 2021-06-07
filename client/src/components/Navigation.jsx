
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            WE WANT ELO
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/CreateListing" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/CreateListing">
                  CreateListing
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/LoginPage" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/LoginPage">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);