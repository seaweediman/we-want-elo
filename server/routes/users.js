const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const name = req.body.name;
  const game = req.body.game;
  const rank = req.body.rank;
  const desc = req.body.desc;
  const steamid = req.body.steamid;

  const user = new User({
    name: name,
    game: game,
    rank: rank,
    desc: desc,
    steamid: steamid,
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
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
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

router.post("/bio/:id", async (req, res) => {
  //Update Bio
  try {
    const updatedBio = await Listing.updateOne(
      { steamid: req.params.id },
      { $set: { bio: req.body.bio } }
    );
    res.json(updatedBio);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/lang/:id", async (req, res) => {
  //Update language
  try {
    const updatedLang = await Listing.updateOne(
      { steamid: req.params.id },
      { $set: { language: req.body.language } }
    );
    res.json(updatedLang);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/region/:id", async (req, res) => {
  //Update region
  try {
    const updatedRegion = await Listing.updateOne(
      { steamid: req.params.id },
      { $set: { region: req.body.region } }
    );
    res.json(updatedRegion);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
