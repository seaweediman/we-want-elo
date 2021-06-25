import "./General.css";
import React, { useEffect, useState } from "react";

import axios from "axios";
function Home() {
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

  return (
    <div class="homepage screen">
      <div className="backgroundimage">
        <img
          className="gamer"
          // src="https://anima-uploads.s3.amazonaws.com/projects/60adfd5bf3283a74a338dba5/releases/60ae0079c8124c55f90dc022/img/gamer@1x.png"
          src="https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2852&q=80"
        />
      </div>
      <h1 className="Catchphrase">
        MATCH UP
        <br />
        <br />
        <br />
        <br />
        WIN MORE
        <br />
        <br />
        <br />
        <br />
        HAVE FUN <br />
        <br />
        <br />
        <br />
        <div className="username">
          {user === null || user === undefined ? "" : user.displayName}
        </div>
        {/* <button onClick={callUser}> Call /user </button> */}
      </h1>
    </div>
  );
}

export default Home;
