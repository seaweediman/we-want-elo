import "./General.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

function Home() {
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

  return (
    <div class="homepage">
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
          {user === null || user === undefined ? (
            <icon className="GiConsoleController">
              <GiConsoleController />
            </icon>
          ) : (
            user.displayName
          )}
        </div>
        {/* <button onClick={callUser}> Call /user </button> */}
      </h1>
      <h2 class="HomepageDescription">The community for gamers</h2>
      <div class="icons">
        <a class="csgoicon" href="https://blog.counter-strike.net/">
          <a href="https://blog.counter-strike.net/">
            <img src="https://pngimg.com/uploads/counter_strike/counter_strike_PNG77.png" />
          </a>
        </a>
        <a class="apexicon" href="https://www.ea.com/en-gb/games/apex-legends">
          <a href="https://www.ea.com/en-gb/games/apex-legends">
            <img src="https://i.ibb.co/cN9dByH/apex-legends-logo-png-transparent.png" />
          </a>
        </a>
      </div>
    </div>
  );
}

export default Home;
