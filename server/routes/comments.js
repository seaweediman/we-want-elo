const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/", async (req, res) => {
  const desc = req.body.desc;
  const commenterid = req.body.commenterid;
  const profileid = req.body.profileid;

  const comment = new Comment({
    desc: desc,
    commenterid: commenterid,
    profileid: profileid,
  });

  await comment
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", async (req, res) => {
  //For comments of that specific profile
  await Comment.find({ profileid: req.params.id })
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
    const removedPost = await Comment.deleteOne({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
