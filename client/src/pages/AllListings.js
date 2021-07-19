import "./Pages.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CsListing from "../components/CsListing";
import ApexListing from "../components/ApexListing";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Navigation, Footer, Home } from "../components";

function FindListing() {
  const [user, setUser] = useState(null);
  const [alluser, setAllUser] = useState([]);

  const [allListing, setAllListing] = useState([]);
  const [searchGame, setSearchGame] = useState("");
  const [searchRank, setSearchRank] = useState("");
  const [searchPlaystyle, setSearchPlaystyle] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchLegend, setSearchLegend] = useState("");

  useEffect(() => {
    axios.get("/listing").then((response) => {
      setAllListing(response.data);
    });
  }, []);

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/user", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  const filterListings = (val) => {
    if (
      val.game === searchGame &&
      (val.rankgroup === searchRank || searchRank === "Any") &&
      (val.playstyle === searchPlaystyle || searchPlaystyle === "Either")
    ) {
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

  const filledup = () => {
    if (searchGame === "CS:GO") {
      return searchRank !== "" && searchPlaystyle !== "" && searchRole !== "";
    } else if (searchGame === "Apex") {
      return searchRank !== "" && searchPlaystyle !== "" && searchLegend !== "";
    }
    return false;
  };
  return !user ? (
    <div className="loginStatus">
      <br />
      <br />
      <br />
      <br />
      <label class="loadingmsg">
        Loading....Please wait. If you are not logged in, please login.
      </label>
    </div>
  ) : (
    <div className="App">
      <header className="AllListingsHeader">Pick your filters</header>
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
            <option value="Apex">APEX</option>
            <option value="CS:GO">CS:GO</option>
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
      {filledup() ? (
        <h1 class="listingsheader"> {searchGame} Available listings</h1>
      ) : (
        ""
      )}
      <br />
      <br />
      {allListing.filter(filterListings).map((val, key) => {
        console.log(val);
        let userrating = alluser.find(
          (element) => element.steamid === val.steamid
        ).rating;
        if (searchGame === "CS:GO") {
          return (
            <CsListing
              id={val._id}
              game={val.game}
              name={val.name}
              rank={val.rank}
              playstyle={val.playstyle}
              role={val.role}
              desc={val.desc}
              steamid={val.steamid}
              rating={userrating}
              time={val.updatedAt}
            />
          );
        } else {
          return (
            <ApexListing
              id={val._id}
              game={val.game}
              name={val.name}
              rank={val.rank}
              playstyle={val.playstyle}
              legend1={val.legend1}
              legend2={val.legend2}
              legend3={val.legend3}
              desc={val.desc}
              steamid={val.steamid}
              rating={userrating}
              time={val.updatedAt}
            />
          );
        }
      })}
      );
    </div>
  );
}

export default FindListing;
