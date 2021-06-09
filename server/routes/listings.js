const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.post("/", async (req, res) => {
  const game = req.body.game;
  const rank = req.body.rank;
  const desc = req.body.desc;

  const listing = new Listing({
    game: game,
    rank: rank,
    desc: desc,
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

// router.post("/", (req, res) => {
//   const game = req.body.game;
//   const rank = req.body.rank;
//   const desc = req.body.desc;

//   const listing = new Listing({
//     game: game,
//     rank: rank,
//     desc: desc,
//   });

//   listing
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/", (req, res) => {
//   Listing.find()
//     .sort({ createdAt: -1 })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
