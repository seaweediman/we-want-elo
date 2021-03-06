import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CsListing from "../components/CsListingProfile";
import ApexListing from "../components/ApexListingProfile";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Sofia"
></link>;

function ProfilePage({ match }) {
  const [owner, setOwner] = useState([]);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [allListing, setAllListing] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newRating, setNewRating] = useState("");
  const [changeBio, setChangeBio] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [reviewedAlready, setreviewedAlready] = useState(false);

  useEffect(() => {
    axios.get(`/listing/${match.params.id}`).then((response) => {
      setAllListing(response.data);
    });
    axios.get(`/comment/${match.params.id}`).then((response) => {
      setAllReviews(response.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    async function fetchOwner() {
      try {
        const response = await axios.get(`/users/${match.params.id}`, {
          withCredentials: true,
        });
        await setOwner(response.data);
        await setProfile(response.data.steamprofile);
      } catch (e) {
        console.error(e);
      }
    }
    fetchOwner();
  }, [match.params.id]);

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

  useEffect(() => {
    async function alreadyReviewed() {
      try {
        const response = await axios.get("/user", {
          withCredentials: true,
        });
        const comment = await axios.get(
          `/comment/${match.params.id}/${response.data.user.id}`
        );
        if (comment.data.length === 0) {
          setreviewedAlready(false);
        } else {
          setreviewedAlready(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
    alreadyReviewed();
  }, [match.params.id]);

  const updateBio = (id) => {
    axios.patch(`/users/bio/${id}`, {
      bio: newBio,
    });
    window.location.reload();
  };

  const submitComment = () => {
    async function submit() {
      await axios.post("/comment", {
        desc: newComment,
        commentername: user.displayName,
        commenterid: user.id,
        profileid: owner.steamid,
        rating: Number(newRating),
      });
    }

    async function updateRating() {
      const n = allReviews.length;
      const updatedRating = (owner.rating * n + Number(newRating)) / (n + 1);
      axios.patch(`/users/rating/${match.params.id}`, {
        rating: updatedRating,
      });
    }
    submit();
    updateRating();
    window.location.reload();
  };

  const deleteComment = (id, deletedrating) => {
    async function updateRating() {
      const n = allReviews.length;
      const updatedRating =
        n === 1 ? 0 : (owner.rating * n - deletedrating) / (n - 1);
      await axios.patch(`/users/rating/${match.params.id}`, {
        rating: updatedRating,
      });
    }

    async function deletereview() {
      await axios.delete(`/comment/${id}`);
    }

    updateRating();
    deletereview();
    window.location.reload();
  };

  return !user || owner === [] || !profile || !match.params.id || !user.id ? (
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
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <header class="ProfileHeader">{profile.displayName}'s profile</header>
      {/* <br />
      <br />
      <br /> */}

      {user.id === match.params.id ? (
        ""
      ) : (
        <a
          class="addfriendprofilebtn"
          href={`steam://friends/add/${match.params.id}`}
        >
          Add Friend
        </a>
      )}
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
              defaultValue={owner.bio}
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
          {Number(owner.rating)}/5 ({allReviews.length} reviews)
        </h2>
        <h2 class="Review">{!profile ? "" : profile.displayName}'s reviews:</h2>
        <br />
        <br />
        {!user ? (
          ""
        ) : owner.steamid === user.id ? (
          ""
        ) : addComment ? (
          <div>
            <div className="RatingDescriptionBox">
              <input
                type="text"
                rows="8"
                cols="140"
                placeholder="Write a comment about this user..."
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              ></input>{" "}
            </div>
            <select
              className="RatingOptionBox"
              onChange={(event) => {
                setNewRating(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select a rating
              </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
            <div className="AddReviewButton1">
              <button className="Reviewbtn1" onClick={() => submitComment()}>
                Add Review
              </button>
            </div>
          </div>
        ) : reviewedAlready ? (
          ""
        ) : (
          <div className="AddReviewButton2">
            <button className="Reviewbtn2" onClick={() => setAddComment(true)}>
              Add Review
            </button>
          </div>
        )}
        {allReviews.map((val, key) => {
          return (
            <div>
              <header class="ReviewContents">
                <header class="ReviewLineHeader">
                  <Link
                    class="nav-link"
                    to={{
                      pathname: `/ProfilePage/${val.commenterid}`,
                      state: {
                        name: val.commentername.key,
                        id: val.commenterid,
                      },
                    }}
                  >
                    <mark class="right" href="">
                      {val.commentername}
                    </mark>
                  </Link>
                  :
                </header>
                <header class="ReviewLine">Rating: {val.rating}/5</header>
                <header class="ReviewLine">Description: {val.desc}</header>
              </header>
              {!user ? (
                ""
              ) : val.commenterid === user.id ? (
                <button
                  className="deletecommentbtn"
                  onClick={() => deleteComment(val._id, val.rating)}
                >
                  Delete Review
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <h2 className="ProfileHeader">Listings</h2>
      <br />
      <br />
      {allListing.map((val, key) => {
        if (val.game === "CS:GO") {
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
              rating={owner.rating}
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
              rating={owner.rating}
              time={val.updatedAt}
            />
          );
        }
      })}
    </div>
  );
}

export default ProfilePage;
