import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Sofia"
></link>;

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
          `http://localhost:3001/users/${match.params.id}`,
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
    axios.patch(`http://localhost:3001/users/bio/${id}`, {
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
      axios.patch(`http://localhost:3001/users/rating/${match.params.id}`, {
        rating: updatedRating,
      });
    }
    submit();
    updateRating();
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <header class="ProfileHeader">
        {!profile ? "" : profile.displayName}'s profile
      </header>
      <br />
      <br />
      <div className="ProfileContents">
        <p class="BioTag">About me: </p>
        <p class="BioDesc">{owner.bio}</p>

        {!user ? (
          ""
        ) : owner.steamid !== user.id ? (
          ""
        ) : changeBio ? (
          <div className="ChangeBioBox">
            <textarea
              type="text"
              // rows="4" cols="80"
              rows="8"
              cols="140"
              placeholder="About yourself..."
              onChange={(event) => {
                setNewBio(event.target.value);
              }}
            ></textarea>{" "}
            <br />
            <div className="ChangeBioButton">
              <button className="Biobtn1" onClick={() => updateBio(profile.id)}>
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="UpdateBioButton">
            <button className="Biobtn2" onClick={() => setChangeBio(true)}>
              Update Bio
            </button>
          </div>
        )}

        <h2 class="Rating">Rating: </h2>
        <h2 class="RatingDesc">
          {owner.rating}/5 ({numberComments} reviews)
        </h2>
        <h2 class="Review">{!profile ? "" : profile.displayName}'s reviews:</h2>
        <br />
        <br />
        {/* {numberComments === 0 ? none :  */}
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
      </div>
      <h2 className="ProfileHeader">
        {/* {!profile ? "" : profile.displayName}'s  */}
        Listings
      </h2>
      <br />
      <br />
      {/* <h1 className='line'>.....................................................................................</h1> */}
      {allListing.map((val, key) => {
        return (
          <div class="eachListing">
            <h1 class="inner">
              <header class="line">
                <mark class="left">Game:</mark>{" "}
                <mark class="right">{val.game}</mark>
              </header>
              <header class="line">
                <mark class="left">Rank:</mark>{" "}
                <mark class="right">{val.rank}</mark>
              </header>
              {/* <header class='line'><mark class="left">Playstyle:</mark> <mark class="right">{val.playstyle}</mark></header>
            <header class='line'><mark class="left">Role:</mark> <mark class="right">{val.role}</mark></header> */}
              {val.game === "CS:GO" ? (
                <div>
                  <header class="line">
                    <mark class="left">Playstyle:</mark>{" "}
                    <mark class="right">{val.playstyle}</mark>
                  </header>
                  <header class="line">
                    <mark class="left">Role:</mark>{" "}
                    <mark class="right">{val.role}</mark>
                  </header>
                </div>
              ) : (
                <div>
                  {" "}
                  <header class="line">
                    <mark class="left">Legends:</mark>{" "}
                    <mark class="right">{val.playstyle}</mark>
                  </header>
                  <header class="line">
                    <mark class="left">Role:</mark>{" "}
                    <mark class="right">
                      {val.legend1} {val.legend2} {val.legend3}
                    </mark>
                  </header>
                </div>
              )}
              <header class="line">
                <mark class="left">Description:</mark>{" "}
                <mark class="right">{val.desc}</mark>
              </header>
              {user !== undefined && user.id === val.steamid ? (
                <button
                  class="deletebtn"
                  onClick={() => deleteListing(val._id)}
                >
                  Delete
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
      <p></p>
    </div>
  );
}

export default ProfilePage;
