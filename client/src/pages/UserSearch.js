import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserSearch() {
  const [alluser, setAllUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAllUser() {
      try {
        const response = await axios.get("/users/", {
          withCredentials: true,
        });
        await setAllUser(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAllUser();
  }, []);
  return (
    <div className="boxes">
      <input
        type="text"
        placeholder="Search user..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      {alluser
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.steamprofile.displayName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val, key) => {
          return (
            <div className="createlistingheader" key={key}>
              <Link
                class="nav-link"
                to={{
                  pathname: `/ProfilePage/${val.steamid}`,
                  state: {
                    name: val.steamprofile.displayName,
                    id: val.steamid,
                  },
                }}
              >
                <mark class="right" href="">
                  {val.steamprofile.displayName}
                </mark>
              </Link>
            </div>
          );
        })}
      ;
      {alluser.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.steamprofile.displayName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      }).length === 0 ? (
        <label class="errormsg">No user found</label>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserSearch;
