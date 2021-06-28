import "./Pages.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
// '../components/Home.js';

function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/user", {
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

  return user === null || user === undefined ? (
    <div class="loginStatus">
      <br />
      <br />
      <br />
      <br />
      <p>Status: Not logged in</p>
      <p>
        <a href="https://we-want-elo.herokuapp.com/auth/steam">
          Sign in with Steam
        </a>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
    </div>
  ) : (
    <div class="loginStatus">
      <br />
      <br />
      <br />
      <br />
      <p>
        <a href="https://we-want-elo.herokuapp.com/logout">Logout</a>
      </p>
      {/* <p>You're logged in, {user.displayName}</p> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default LoginPage;
