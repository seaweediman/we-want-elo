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

  const [allListing, setAllListing] = useState([]);

  const [searchGame, setSearchGame] = useState("");
  const [searchRank, setSearchRank] = useState("");

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
        setUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  const CreateListing = () => {
    axios.post("http://localhost:3001/listing", {
      name: user.displayName,
      game: game,
      rank: rank,
      desc: desc,
      steamid: user.id,
    });
  };

  const deleteListing = (id) => {
    axios.delete(`http://localhost:3001/listing/${id}`);
  };

  return (
    <div className="App">
      <br></br>
      <br></br>
      <br></br>
      {/* <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
          </Switch>
          <Footer />
        </Router> */}
      <div class="boxes">
        <div class="gamebox">
          <label class="boxTitle">Game:</label>
          <select
            onChange={(event) => {
              setGame(event.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Game...
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
              onChange={(event) => {
                setRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
              <option value="Master">Master</option>
              <option value="Predator">Apex Predator</option>
            </select>
          </div>
        ) : (
          <div class="gamebox">
            <label class="boxTitle">Rank:</label>
            <select
              onChange={(event) => {
                setRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold Nova</option>
              <option value="MG">Master Guardian</option>
              <option value="LE">Legendary Eagles</option>
              <option value="Top">Supreme and Global Elite</option>
            </select>
          </div>
        )}
        <br />
        <br />
        <div class="gamebox">
          <label class="boxTitle">Description:</label>
          <input
            type="text"
            placeholder="About yourself..."
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
      <div class="boxes">
        <div class="gamebox">
          <label class="boxTitle">Game:</label>
          <select
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
              onChange={(event) => {
                setSearchRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
              <option value="Master">Master</option>
              <option value="Predator">Apex Predator</option>
            </select>
          </div>
        ) : (
          <div class="gamebox">
            <label class="boxTitle">Rank:</label>
            <select
              onChange={(event) => {
                setSearchRank(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Filter By Rank...
              </option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold Nova</option>
              <option value="Master Guardians">Master Guardian</option>
              <option value="Legendary Eagles">Legendary Eagles</option>
              <option value="Supreme and Global Elite">
                Supreme and Global Elite
              </option>
            </select>
          </div>
        )}
        <br />
      </div>
      <h1 class="header">
        {" "}
        {searchGame} {searchRank} listings
      </h1>
      <h1>--------------------------------------</h1>
      {allListing
        .filter((val) => val.game === searchGame && val.rank === searchRank)
        .map((val, key) => {
          return (
            <div>
              <h1 class="listingheader"> Name : </h1>
              <h2 class="listingvalue">{val.name}</h2>
              <h1 class="listingheader"> Game : </h1>
              <h2 class="listingvalue">{val.game}</h2>
              <h1 class="listingheader"> Rank : </h1>
              <h2 class="listingvalue">{val.rank}</h2>
              <h1 class="listingheader"> Description : </h1>
              <h2 class="listingvalue">{val.desc} </h2>
              <h1 class="listingheader"> steamID : </h1>
              <h2 class="listingvalue">{val.steamid}</h2>
              {user !== undefined && user.id === val.steamid ? (
                <button
                  class="deletebtn"
                  onClick={() => deleteListing(val._id)}
                >
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
              <h1>--------------------------------------</h1>
            </div>
          );
        })}
      );
    </div>
  );
}

export default CreateListing;
