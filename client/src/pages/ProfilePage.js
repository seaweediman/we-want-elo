import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProfilePage({ match }) {
  const [owner, setOwner] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [allListing, setAllListing] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newRating, setNewRating] = useState("");
  const [changeBio, setChangeBio] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [numberComments, setNumberComments] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/listing/${match.params.id}`)
      .then((response) => {
        setAllListing(response.data);
      });
    axios
      .get(`http://localhost:3001/comment/${match.params.id}`)
      .then((response) => {
        setAllReviews(response.data);
      });
  }, []);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${match.params.id}`,
          {
            withCredentials: true,
          }
        );
        await setOwner(response.data);
        await setProfile(response.data.steamprofile);
      } catch (e) {
        console.error(e);
      }
    }
    fetchOwner();
  }, []);

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

  useEffect(() => {
    async function getCount() {
      try {
        const count = await axios.get(
          `http://localhost:3001/comment/count/${match.params.id}`
        );
        setNumberComments(count.data);
      } catch (e) {
        console.error(e);
      }
    }
    getCount();
  }, []);

  const deleteListing = (id) => {
    axios.delete(`http://localhost:3001/listing/${id}`);
  };

  const updateBio = (id) => {
    window.location.reload();
    axios.patch(`http://localhost:3001/user/bio/${id}`, {
      bio: newBio,
    });
  };

  const submitComment = () => {
    async function submit() {
      await axios.post("http://localhost:3001/comment", {
        desc: newComment,
        commentername: user.displayName,
        commenterid: user.id,
        profileid: owner.steamid,
        rating: Number(newRating),
      });
    }

    async function updateRating() {
      const n = Number(numberComments) + 1;
      console.log(n);
      const updatedRating = (owner.rating + Number(newRating)) / n;
      axios.patch(`http://localhost:3001/user/rating/${match.params.id}`, {
        rating: updatedRating,
      });
    }
    submit();
    updateRating();
  };

  return (
    <div class="Profile">
      <br />
      <br />
      <h1>Welcome to {!profile ? "" : profile.displayName}'s Profile</h1>
      <p>Bio: {owner.bio}</p>
      {!user ? (
        ""
      ) : owner.steamid !== user.id ? (
        ""
      ) : changeBio ? (
        <div>
          <input
            onChange={(event) => {
              setNewBio(event.target.value);
            }}
          ></input>{" "}
          <button onClick={() => updateBio(profile.id)}>Update Bio</button>
        </div>
      ) : (
        <button onClick={() => setChangeBio(true)}>Update Bio?</button>
      )}
      <h2>
        Rating: {owner.rating}/5 ({numberComments} reviews)
      </h2>
      <h2>{!profile ? "" : profile.displayName}'s reviews</h2>
      {!user ? (
        ""
      ) : owner.steamid === user.id ? (
        ""
      ) : addComment ? (
        <div>
          <input
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>{" "}
          <select
            onChange={(event) => {
              setNewRating(event.target.value);
            }}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </select>
          <button onClick={() => submitComment()}>Add Review</button>
        </div>
      ) : (
        <button onClick={() => setAddComment(true)}>Add Review?</button>
      )}
      {allReviews.map((val, key) => {
        return (
          <div>
            <h1 class="listingheader"> {val.commentername} says : </h1>
            <h2 class="listingvalue">{val.desc}</h2>
            <h2 class="listingheader">And gave a rating of: </h2>
            <h2 class="listingvalue">{val.rating}</h2>
          </div>
        );
      })}
      <h2>{!profile ? "" : profile.displayName}'s Listings</h2>
      {allListing.map((val, key) => {
        return (
          <div>
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
              <h1 class="listingheader"> Name : </h1>
              <h2 class="listingvalue" href="">
                {val.name}
              </h2>
            </Link>
            <h1 class="listingheader"> Game : </h1>
            <h2 class="listingvalue">{val.game}</h2>
            <h1 class="listingheader"> Rank : </h1>
            <h2 class="listingvalue">{val.rank}</h2>
            {val.game === "CS:GO" ? (
              <div>
                {" "}
                <h1 class="listingheader"> Playstyle : </h1>
                <h2 class="listingvalue">{val.playstyle}</h2>
                <h1 class="listingheader"> Role : </h1>
                <h2 class="listingvalue">{val.role}</h2>
              </div>
            ) : (
              <div>
                {" "}
                <h1 class="listingheader"> Playstyle : </h1>
                <h2 class="listingvalue">{val.playstyle}</h2>
                <h1 class="listingheader"> Legends : </h1>
                <h2 class="listingvalue">{val.legend1}</h2>
                <h2 class="listingvalue">{val.legend2}</h2>
                <h2 class="listingvalue">{val.legend3}</h2>
              </div>
            )}
            <h1 class="listingheader"> Description : </h1>
            <h2 class="listingvalue">{val.desc} </h2>
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
            <h1>--------------------------------------</h1>
          </div>
        );
      })}
    </div>
  );
}

export default ProfilePage;
