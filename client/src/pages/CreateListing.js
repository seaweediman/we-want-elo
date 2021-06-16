import './Pages.css';
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
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      
        {/* <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
          </Switch>
          <Footer />
        </Router> */}
        <div class='boxes'>
        <div class='gamebox'>
      <label class='boxTitle'>Game:</label>
      <input
        type="text"
        placeholder="Your game..."
        onChange={(event) => {
          setGame(event.target.value);
        }}
      />
      </div>
      <br />
      <div class='gamebox'>
      <label class='boxTitle'>Rank:</label>
      <input
        type="text"
        placeholder="Your rank..."
        onChange={(event) => {
          setRank(event.target.value);
        }}
      />
      </div>
      <br />
      <div class='gamebox'>
      <label class='boxTitle'>Description:</label>
      <input
        type="text"
        placeholder="About yourself..."
        onChange={(event) => {
          setDesc(event.target.value);
        }}
      />
      </div>
      
      <button class='createlistingbtn' onClick={CreateListing}> Create Listing </button>
      </div>
      <h1 class='header'> All listings</h1>
      <h1>--------------------------------------</h1>
      {allListing.map((val, key) => {
        return (
          <div>
            <h1 class='listingheader'> Name : </h1><h2 class='listingvalue'>{val.name}</h2>
            <h1 class='listingheader'> Game : </h1><h2 class='listingvalue'>{val.game}</h2>
            <h1 class='listingheader'> Rank : </h1><h2 class='listingvalue'>{val.rank}</h2>
            <h1 class='listingheader'> Description : </h1><h2 class='listingvalue'>{val.desc} </h2>
            <h1 class='listingheader'> steamID : </h1><h2 class='listingvalue'>{val.steamid}</h2>
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
      })}
  );
  </div>)
}

export default CreateListing;
