import React, { useEffect, useState } from "react";

import axios from "axios";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home } from "../components";
// import "../App.css";

function CreateListing() {
  const [game, setGame] = useState("");
  const [rank, setRank] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState(null);

  const [allListing, setAllListing] = useState([]);

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

  const CreateListing = () => {
    console.log(user.id);
    axios.post("http://localhost:3001/listing", {
      name: user.displayName,
      game: game,
      rank: rank,
      desc: desc,
      steamid: user.id,
    });
  };

  const deleteListing = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3001/listing/${id}`);
  };

  return (
    <div className="App">
      <h1> GGEZ with Listings</h1>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            {/* <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} /> */}
          </Switch>
          <Footer />
        </Router>
      </div>
      <label>Game:</label>
      <input
        type="text"
        onChange={(event) => {
          setGame(event.target.value);
        }}
      />

      <label>Rank:</label>
      <input
        type="text"
        onChange={(event) => {
          setRank(event.target.value);
        }}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(event) => {
          setDesc(event.target.value);
        }}
      />
      <button onClick={CreateListing}> Create Listing </button>

      <h1>--------------------------------------</h1>

      {allListing.map((val, key) => {
        return (
          <div>
            <h1> Name : {val.name}</h1>
            <h1> Game : {val.game}</h1>
            <h1> Rank : {val.rank}</h1>
            <h1> Description : {val.desc} </h1>
            <h1> steamID : {val.steamid}</h1>
            {user !== undefined && user.id === val.steamid ? (
              <button onClick={() => deleteListing(val._id)}> Delete </button>
            ) : (
              ""
            )}
            {user !== undefined && user.id !== val.steamid ? (
              <a href={`steam://friends/add/${val.steamid}`}>
                <button>Add as Friend</button>
              </a>
            ) : (
              ""
            )}
            <h1>--------------------------------------</h1>
          </div>
        );
      })}
    </div>
  );
}

export default CreateListing;
