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
    .sort({ updatedAt: -1 })
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
    .sort({ updatedAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/update/:id", async (req, res) => {
  //get specific listing
  await Listing.find({ _id: req.params.id })
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

router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Listing.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  //Bump
  try {
    const updatedTime = await Listing.updateOne(
      { _id: req.params.id },
      { $set: { updatedAt: Date.now() } }
    );
    res.json(updatedTime);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/cs/:id", async (req, res) => {
  try {
    const id = req.body.id;
    const rank = req.body.rank;
    const rankgroup = req.body.rankgroup;
    const playstyle = req.body.playstyle;
    const role = req.body.role;
    const desc = req.body.desc;
    const updatedListing = await Listing.updateOne(
      { _id: req.params.id },
      {
        $set: {
          updatedAt: Date.now(),
          rank: rank,
          rankgroup: rankgroup,
          playstyle: playstyle,
          role: role,
          desc: desc,
        },
      }
    );
    res.json(updatedListing);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/apex/:id", async (req, res) => {
  try {
    const rank = req.body.rank;
    const rankgroup = req.body.rankgroup;
    const playstyle = req.body.playstyle;
    const legend1 = req.body.legend1;
    const legend2 = req.body.legend2;
    const legend3 = req.body.legend3;
    const desc = req.body.desc;

    const updatedListing = await Listing.updateOne(
      { _id: req.params.id },
      {
        $set: {
          updatedAt: Date.now(),
          rank: rank,
          rankgroup: rankgroup,
          playstyle: playstyle,
          legend1: legend1,
          legend2: legend2,
          legend3: legend3,
          desc: desc,
        },
      }
    );
    res.json(updatedListing);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
