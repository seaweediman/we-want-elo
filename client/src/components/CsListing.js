import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CsListing(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/user", {
          withCredentials: true,
        });
        console.log(props);
        setUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  const deleteListing = (id) => {
    axios.delete(`/listing/${id}`);
    window.location.reload();
  };

  const bumpListing = (id) => {
    axios.patch(`/listing/${id}`);
    window.location.reload();
  };

  return (
    <div class="eachListing">
      <h1 class="inner">
        <header class="line">
          <mark class="left"> Name: </mark>
          <Link
            class="nav-link"
            to={{
              pathname: `/ProfilePage/${props.steamid}`,
              state: {
                name: props.name.key,
                id: props.steamid,
              },
            }}
          >
            <mark class="right" href="">
              {props.name}
            </mark>
          </Link>
        </header>
        <header class="line">
          <mark class="left">Game:</mark>{" "}
          <mark class="right">{props.game}</mark>
        </header>
        <header class="line">
          <mark class="left">Rank:</mark>{" "}
          <mark class="right">{props.rank}</mark>
        </header>
        <div>
          <header class="line">
            <mark class="left">Playstyle:</mark>{" "}
            <mark class="right">{props.playstyle}</mark>
          </header>
          <header class="line">
            <mark class="left">Role:</mark>{" "}
            <mark class="right">{props.role}</mark>
          </header>
        </div>
        <header class="line">
          <mark class="left">Description:</mark>{" "}
          <mark class="right">{props.desc}</mark>
        </header>
        <header class="line">
          <mark class="left">Rating:</mark>{" "}
          <mark class="right">{props.rating}</mark>
        </header>
        <header class="line">
          <mark class="left">Updated on:</mark>{" "}
          <mark class="right">
            {new Date(props.time).toLocaleDateString()}
            <br />
            {new Date(props.time).toLocaleTimeString()}
          </mark>
        </header>
        {user !== undefined && user.id === props.steamid ? (
          <button class="deletebtn" onClick={() => deleteListing(props.id)}>
            Delete
          </button>
        ) : (
          ""
        )}
        {user !== undefined &&
        user.id === props.steamid &&
        Math.floor((new Date() - new Date(props.time)) / (1000 * 3600 * 24)) >=
          3 ? (
          <button class="deletebtn" onClick={() => bumpListing(props.id)}>
            Bump
          </button>
        ) : (
          ""
        )}
        {user !== undefined && user.id !== props.steamid ? (
          <a href={`steam://friends/add/${props.steamid}`}>
            <button class="addfriendbtn">Add Friend</button>
          </a>
        ) : (
          ""
        )}
      </h1>
    </div>
  );
}

export default CsListing;
