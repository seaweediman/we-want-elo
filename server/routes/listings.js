const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.post("/cs", async (req, res) => {
  const name = req.body.name;
  const game = req.body.game;
  const rank = req.body.rank;
  const rankgroup = req.body.rankgroup;
  const playstyle = req.body.playstyle;
  const role = req.body.role;
  const desc = req.body.desc;
  const steamid = req.body.steamid;

  const listing = new Listing({
    name: name,
    game: game,
    rank: rank,
    rankgroup: rankgroup,
    playstyle: playstyle,
    role: role,
    desc: desc,
    steamid: steamid,
  });

  await listing
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/apex", async (req, res) => {
  const name = req.body.name;
  const game = req.body.game;
  const rank = req.body.rank;
  const rankgroup = req.body.rankgroup;
  const playstyle = req.body.playstyle;
  const legend1 = req.body.legend1;
  const legend2 = req.body.legend2;
  const legend3 = req.body.legend3;
  const desc = req.body.desc;
  const steamid = req.body.steamid;

  const listing = new Listing({
    name: name,
    game: game,
    rank: rank,
    rankgroup: rankgroup,
    playstyle: playstyle,
    legend1: legend1,
    legend2: legend2,
    legend3: legend3,
    desc: desc,
    steamid: steamid,
  });

  await listing
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  await Listing.find()
    .sort({ createdAt: -1 })
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
  await Listing.find({ steamid: req.params.id })
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

router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Listing.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
