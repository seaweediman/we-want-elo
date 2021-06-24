import './Pages.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
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
          console.log(response.data.user);
          setUser(response.data.user);
        } catch (e) {
          console.error(e);
        }
      }
      fetchUser();
    }, []);
  return (
    <div class='Profile'>
      <br /><br />
      <p>Welcome, {user === null || user === undefined
                ? ""
                : user.displayName}</p>
      <p>
      
      
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </p>
    </div>
  );
}

export default ProfilePage;