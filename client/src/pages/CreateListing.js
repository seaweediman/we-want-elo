import "./Pages.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Navigation, Footer, Home } from "../components";

function CreateListing() {
  const [game, setGame] = useState("");
  const [rank, setRank] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState(null);
  const [playstyle, setPlaystyle] = useState("");
  const [role, setRole] = useState("");
  const [legend1, setLegend1] = useState("");
  const [legend2, setLegend2] = useState("");
  const [legend3, setLegend3] = useState("");

  const csgoSilver = [
    "Silver I",
    "Silver II",
    "Silver III",
    "Silver IV",
    "Silver Elite",
    "Silver Elite Master",
  ];
  const csgoGold = [
    "Gold Nova I",
    "Gold Nova II",
    "Gold Nova III",
    "Gold Nova Master",
  ];

  const MG = [
    "Master Guardian I",
    "Master Guardian II",
    "Master Guardian Elite",
    "Distinguished Master Guardian",
  ];
  const LE = ["Legendary Eagle", "Legendary Eagle Master"];

  const apexBronze = ["Bronze IV", "Bronze III", "Bronze II", "Bronze I"];
  const apexSilver = ["Silver IV", "Silver III", "Silver II", "Silver I"];
  const apexGold = ["Gold IV", "Gold III", "Gold II", "Gold I"];
  const apexPlatinum = [
    "Platinum IV",
    "Platinum III",
    "Platinum II",
    "Platinum I",
  ];
  const apexDiamond = ["Diamond IV", "Diamond III", "Diamond II", "Diamond I"];

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

  const CreateListing = () => {
    if (game === "CS:GO") {
      axios.post("http://localhost:3001/listing/cs", {
        name: user.displayName,
        game: game,
        rank: rank,
        rankgroup: getGroup(rank),
        playstyle: playstyle,
        role: role,
        desc: desc,
        steamid: user.id,
      });
    } else {
      axios.post("http://localhost:3001/listing/apex", {
        name: user.displayName,
        game: game,
        rank: rank,
        rankgroup: getGroup(rank),
        playstyle: playstyle,
        legend1: legend1,
        legend2: legend2,
        legend3: legend3,
        desc: desc,
        steamid: user.id,
      });
    }
    window.location.reload();
  };

  const getGroup = (rank) => {
    if (game === "CS:GO") {
      if (csgoSilver.includes(rank)) {
        return "csgoSilver";
      } else if (csgoGold.includes(rank)) {
        return "csgoGold";
      } else if (MG.includes(rank)) {
        return "MG";
      } else if (LE.includes(rank)) {
        return "LE";
      } else {
        return "Top";
      }
    } else {
      if (apexBronze.includes(rank)) {
        return "apexBronze";
      } else if (apexSilver.includes(rank)) {
        return "apexSilver";
      } else if (apexGold.includes(rank)) {
        return "apexGold";
      } else if (apexPlatinum.includes(rank)) {
        return "apexPlatinum";
      } else if (apexDiamond.includes(rank)) {
        return "apexDiamond";
      } else if (rank === "Master") {
        return "Master";
      } else {
        return "Predator";
      }
    }
  };

  return (
    <div className="App">
      <header className="createlistingheader">Create your listing</header>
      <div class="boxes">
        <label class="boxTitle">Game:</label>
        <div class="gamebox">
          <select
            className="dropdownGame"
            onChange={(event) => {
              setGame(event.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Select your game
            </option>
            <option value="CS:GO">CS:GO</option>
            <option value="Apex">APEX</option>
          </select>
        </div>
        <br />
        {!game ? (
          ""
        ) : game === "Apex" ? (
          <div class="gamebox">
            <label class="boxTitle">Rank:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your rank
              </option>
              <option value="Bronze I">Bronze I</option>
              <option value="Bronze II">Bronze II</option>
              <option value="Bronze III">Bronze III</option>
              <option value="Bronze IV">Bronze IV</option>
              <option value="Silver I">Silver I</option>
              <option value="Silver II">Silver II</option>
              <option value="Silver III">Silver III</option>
              <option value="Silver IV">Silver IV</option>
              <option value="Gold I">Gold I</option>
              <option value="Gold II">Gold II</option>
              <option value="Gold III">Gold III</option>
              <option value="Gold IV">Gold IV</option>
              <option value="Platinum I">Platinum I</option>
              <option value="Platinum II">Platinum II</option>
              <option value="Platinum III">Platinum III</option>
              <option value="Platinum IV">Platinum IV</option>
              <option value="Diamond I">Diamond I</option>
              <option value="Diamond II">Diamond II</option>
              <option value="Diamond III">Diamond III</option>
              <option value="Diamond IV">Diamond IV</option>
              <option value="Master">Master</option>
              <option value="Predator">Apex Predator</option>
            </select>
            <label class="boxTitle">Playstyle:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setPlaystyle(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your playstyle
              </option>
              <option value="Aggressive">Aggressive</option>
              <option value="Passive">Passive</option>
            </select>
            <label class="boxTitle">Legends:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setLegend1(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your most preferred Legend
              </option>
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
            <select
              className="dropdownGame"
              onChange={(event) => {
                setLegend2(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your 2nd most preferred Legend
              </option>
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
            <select
              className="dropdownGame"
              onChange={(event) => {
                setLegend3(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your 3rd most preferred Legend
              </option>
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
              className="dropdownGame"
              onChange={(event) => {
                setRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your rank
              </option>
              <option value="Silver I">Silver I</option>
              <option value="Silver II">Silver II</option>
              <option value="Silver III">Silver III</option>
              <option value="Silver IV">Silver IV</option>
              <option value="Silver Elite">Silver Elite</option>
              <option value="Silver Elite Master">Silver Elite Master</option>
              <option value="Gold Nova I">Gold Nova I</option>
              <option value="Gold Nova II">Gold Nova II</option>
              <option value="Gold Nova III">Gold Nova III</option>
              <option value="Gold Nova Master">Gold Nova Master</option>
              <option value="Master Guardian I">Master Guardian I</option>
              <option value="Master Guardian II">Master Guardian II</option>
              <option value="Master Guardian Elite">
                Master Guardian Elite
              </option>
              <option value="Distinguished Master Guardian">
                Distinguished Master Guardian
              </option>
              <option value="Legendary Eagle">Legendary Eagle</option>
              <option value="Legendary Eagle Master">
                Legendary Eagle Master
              </option>
              <option value="Supreme Master First Class">
                Supreme Master First Class
              </option>
              <option value="Global Elite">Global Elite</option>
            </select>
            <label class="boxTitle">Playstyle:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setPlaystyle(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your Playstyle
              </option>
              <option value="Aggressive">Aggressive</option>
              <option value="Passive">Passive</option>
            </select>
            <label class="boxTitle">Role:</label>
            <select
              className="dropdownGame"
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select your preferred role
              </option>
              <option value="AWPer">AWPer</option>
              <option value="Rifler">Rifler</option>
            </select>
          </div>
        )}
        <br />
        <br />
        <div class="gamebox">
          <label class="boxTitle">Description:</label>
          <input
            type="text"
            placeholder="Include any other information"
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
        </div>

        <button class="createlistingbtn" onClick={CreateListing}>
          {" "}
          Create Listing{" "}
        </button>
      </div>
      );
    </div>
  );
}

export default CreateListing;
