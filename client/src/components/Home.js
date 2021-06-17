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
    <div class="container-center-horizontal">
      <div class="homepage screen">
        <img
          class="gamer"
          src="https://anima-uploads.s3.amazonaws.com/projects/60adfd5bf3283a74a338dba5/releases/60ae0079c8124c55f90dc022/img/gamer@1x.png"
        />
        <div class="flex-col">
          <h1 class="text-1">
            MATCH UP
            <br />
            <br />
            WIN MORE
            <br />
            <br />
            <p>
              HAVE FUN{" "}
              {user === null || user === undefined
                ? "unknown user"
                : user.displayName}
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
