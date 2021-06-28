import "./General.css"
import "../pages/LoginPage";
import "../pages/LogoutPage";
import { Link, withRouter } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";


function Navigation(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          withCredentials: true,
        });
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  return (user === null || user === undefined)
    ?
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div className="title">
            {/* <nav class="navbar navbar-light bg-light"> */}
            <a href="/">WE WANT ELO </a>
            {/* <icon className='GiConsoleController'><GiConsoleController /></icon> */}
            {/* </nav> */}
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
    :
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

{/* 

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
            </div> */}
            
            <div class="dropdown">
            <button class="dropbtn"><li>
              <Link class="nav-link">
                Listings
              </Link>
            </li></button>
  
  <div class="dropdown-content">
    <a href="/AllListings">All listings</a>
    <a href="/CreateListing">Create your listing</a>
  </div>
</div>



            <div className="navlogin">
    <button class="loginbtn">
    <li
      class={`nav-item  ${
        props.location.pathname === "/LogoutPage" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to="/LogoutPage">
        Logout
      </Link>
    </li>
    </button>
    </div>
    


    <div className="navprofile">
    <button class="profilebtn">
    <li
      class={`nav-item  ${
        props.location.pathname === "/ProfilePage" ? "active" : ""
      }`}
    >
      <Link class="nav-link" to={`/ProfilePage/${user.id}`}>
        Profile
      </Link>
    </li>
    </button>
    </div>  


      </div>

    </nav>
  </div>
}

export default withRouter(Navigation);