import './Pages.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function LogoutPage() {
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
    ? <div class='loginStatus'>
    <br /><br /><br /><br />
    <p>Status: Not logged in</p>
    <p>
      <a href="http://localhost:3001/auth/steam">Sign in with Steam</a>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </p>
  </div>
    : <div class='loginStatus'>
    <br /><br /><br /><br />
    <p>You're logged in, {user.displayName}</p>
    <p>
    <a href="http://localhost:3001/logout">Click here to logout</a>
    </p>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
  }

export default LogoutPage;