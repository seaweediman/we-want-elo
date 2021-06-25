const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const steamid = req.body.steamid;
  const steamprofile = req.body.steamprofile;
  const bio = req.body.bio;
  const rating = req.body.rating;

  const user = new User({
    steamid: steamid,
    steamprofile: steamprofile,
    bio: bio,
    rating: rating,
  });

  await user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// *************************************************************
router.get("/:id", async (req, res) => {
  //For listings of that specific profile
  await User.find({ steamid: req.params.id })
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Example
// useEffect(() => {
//   axios.get(`http://localhost:3001/listing/${steamId}`).then((response) => {
//     setAllListing(response.data);
//   });
// });

// *************************************************************

router.patch("/bio/:id", async (req, res) => {
  //Update Bio
  try {
    const updatedBio = await User.updateOne(
      { steamid: req.params.id },
      { $set: { bio: req.body.bio } }
    );
    res.json(updatedBio);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/rating/:id", async (req, res) => {
  //Update Rating
  try {
    const updatedRating = await User.updateOne(
      { steamid: req.params.id },
      { $set: { rating: req.body.rating } }
    );
    res.json(updatedRating);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
