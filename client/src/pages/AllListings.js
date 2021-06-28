import "./Pages.css";
import { Link, withRouter } from "react-router-dom";
import React, { useEffect, useState, useHistory } from "react";
import axios from "axios";
import { FormHelperText } from "@material-ui/core";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Navigation, Footer, Home } from "../components";

function CreateListing() {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState("");

  const [allListing, setAllListing] = useState([]);
  const [searchGame, setSearchGame] = useState("");
  const [searchRank, setSearchRank] = useState("");
  const [searchPlaystyle, setSearchPlaystyle] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchLegend, setSearchLegend] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/listing").then((response) => {
      setAllListing(response.data);
    });
  });

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

  const deleteListing = (id) => {
    axios.delete(`http://localhost:3001/listing/${id}`);
  };

  const getRating = (id) => {
    async function fetchOwner() {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`, {
          withCredentials: true,
        });
        setRating(response.data.rating);
      } catch (e) {
        console.error(e);
      }
    }
    fetchOwner();
  };

  const filterListings = (val) => 
  {
    if (
      val.game === searchGame &&
      (val.rankgroup === searchRank || searchRank === "Any") &&
      (val.playstyle === searchPlaystyle || searchPlaystyle === "Either")
    ) 

    {
      if (searchGame === "CS:GO") {
        return val.role === searchRole || searchRole === "Either";
      } else {
        return (
          val.legend1 === searchLegend ||
          val.legend2 === searchLegend ||
          val.legend3 === searchLegend ||
          searchLegend === "Any"
        );
      }
    }
    return false;
  };

  return (
    <div className="App">
      <header className="AllListingsHeader">All listings</header>
      <div class="boxes">
        <div class="gamebox">
          <label class="boxTitle">Game:</label>
          <select
            className="boxFilter"
            onChange={(event) => {
              setSearchGame(event.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Filter By Game...
            </option>
            <option value="CS:GO">CS:GO</option>
            <option value="Apex">APEX</option>
          </select>
        </div>
        <br />
        {!searchGame ? (
          ""
        ) : searchGame === "Apex" ? (
          <div class="gamebox">
            <label class="boxTitle">Rank:</label>
            <select
              className="boxFilter"
              onChange={(event) => {
                setSearchRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Any">Any</option>
              <option value="apexBronze">Bronze</option>
              <option value="apexSilver">Silver</option>
              <option value="apexGold">Gold</option>
              <option value="apexPlatinum">Platinum</option>
              <option value="apexDiamond">Diamond</option>
              <option value="Master">Master</option>
              <option value="Predator">Apex Predator</option>
            </select>
            <label class="boxTitle">Playstyle:</label>
            <select
              className="boxFilter"
              onChange={(event) => {
                setSearchPlaystyle(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Playstyle...
              </option>
              <option value="Aggressive">Aggressive</option>
              <option value="Passive">Passive</option>
              <option value="Either">Either</option>
            </select>
            <label class="boxTitle">Legend:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setSearchLegend(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select which legend you prefer your teammate to be
              </option>
              <option value="Any">Any</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bloodhound">Bloodhound</option>
              <option value="Caustic">Caustic</option>
              <option value="Crypto">Crypto</option>
              <option value="Fuse">Fuse</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Horizon">Horizon</option>
              <option value="Lifeline">Lifeline</option>
              <option value="Loba">Loba</option>
              <option value="Mirage">Mirage</option>
              <option value="Octane">Octane</option>
              <option value="Pathfinder">Pathfinder</option>
              <option value="Rampart">Rampart</option>
              <option value="Revenant">Revenant</option>
              <option value="Valkyrie">Valkyrie</option>
              <option value="Wattson">Wattson</option>
              <option value="Wraith">Wraith</option>
            </select>
          </div>
        ) : (
          <div class="gamebox">
            <label class="boxTitle">Rank:</label>
            <select
              className="boxFilter"
              onChange={(event) => {
                setSearchRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Any">Any</option>
              <option value="csgoSilver">Silver</option>
              <option value="csgoGold">Gold Nova</option>
              <option value="MG">Master Guardian</option>
              <option value="LE">Legendary Eagles</option>
              <option value="Top">Supreme and Global Elite</option>
            </select>
            <label class="boxTitle">Playstyle:</label>
            <select
              className="boxFilter"
              onChange={(event) => {
                setSearchPlaystyle(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Playstyle...
              </option>
              <option value="Aggressive">Aggressive</option>
              <option value="Passive">Passive</option>
              <option value="Either">Either</option>
            </select>
            <label class="boxTitle">Role:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setSearchRole(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your preferred role
              </option>
              <option value="AWPer">AWPer</option>
              <option value="Rifler">Rifler</option>
              <option value="Either">Either</option>
            </select>
          </div>
        )}

        <br />
      </div>
      <h1 class="listingsheader">
        {" "}
        {searchGame} Available listings
        </h1>
        <br />
        <br />
      {allListing.filter(filterListings).map((val, key) => {
        getRating(val.steamid);
        return (
          <div className="eachListing">
            <h1 class='inner'>
            <header class='line'>
              <mark class="left"> Name: </mark>
              <Link
              class="nav-link"
              to={{
                pathname: `/ProfilePage/${val.steamid}`,
                state: {
                  name: val.name.key,
                  id: val.steamid,
                },
              }}
            >
              <mark class="right" href="">
                {val.name}
              </mark>
            </Link>
            </header>
            <header class='line'><mark class="left">Game:</mark> <mark class="right">{val.game}</mark></header>
            <header class='line'><mark class="left">Rank:</mark> <mark class="right">{val.rank}</mark></header>
            {/* <header class='line'><mark class="left">Playstyle:</mark> <mark class="right">{val.playstyle}</mark></header>
            <header class='line'><mark class="left">Role:</mark> <mark class="right">{val.role}</mark></header> */}
            {val.game === "CS:GO" ? (
              <div>
                <header class='line'><mark class="left">Playstyle:</mark> <mark class="right">{val.playstyle}</mark></header>
                <header class='line'><mark class="left">Role:</mark> <mark class="right">{val.role}</mark></header>

              </div>
            ) : (
              <div>
                {" "}
                <header class='line'><mark class="left">Legends:</mark> <mark class="right">{val.playstyle}</mark></header>
                <header class='line'><mark class="left">Role:</mark> <mark class="right">{val.legend1} {val.legend2} {val.legend3}</mark></header>
              </div>
            )}
            <header class='line'><mark class="left">Description:</mark> <mark class="right">{val.desc}</mark></header>
            <header class='line'><mark class="left">Rating:</mark> <mark class="right">{rating}</mark></header>
            {user !== undefined && user.id === val.steamid ? (
              <button class="deletebtn" onClick={() => deleteListing(val._id)}>
                {" "}
                Delete{" "}
              </button>
            ) : (
              ""
            )}
            {user !== undefined && user.id !== val.steamid ? (
              <a href={`steam://friends/add/${val.steamid}`}>
                <button class="addfriendbtn">Add Friend</button>
              </a>
            ) : (
              ""
            )}
            </h1>
          </div>
        );
      })}


      {/* to display all listings */}

      {/* <h1 class='listingsheader'> All listings</h1>
      <h1>--------------------------------------</h1>
      {allListing.map((val, key) => {
        return (
          <div>
            <header class='line'>Name : {val.name} </header>
            <header class='line'>Game : {val.game}</header>
            <header class='line'> Rank : {val.rank}</header>
            <header class='line'>Description : {val.desc}</header>
            <header class='line'>steamID : {val.steamid}</header>
            {user !== undefined && user.id === val.steamid ? (
              <button class='deletebtn' onClick={() => deleteListing(val._id)}> Delete </button>
            ) : (
              ""
            )}
            {user !== undefined && user.id !== val.steamid ? (
              <a href={`steam://friends/add/${val.steamid}`}>
                <button class='addfriendbtn'>Add Friend</button>
              </a>
            ) : (
              ""
            )}
            <h1>--------------------------------------</h1>
          </div>
        );
      })} */}
      );
    </div>
  );
}

export default CreateListing;
