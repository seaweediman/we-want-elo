const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/", async (req, res) => {
  const desc = req.body.desc;
  const commentername = req.body.commentername;
  const commenterid = req.body.commenterid;
  const profileid = req.body.profileid;
  const rating = req.body.rating;

  const comment = new Comment({
    desc: desc,
    commentername: commentername,
    commenterid: commenterid,
    profileid: profileid,
    rating: rating,
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

router.get("/count/:id", async (req, res) => {
  //For comments of that specific profile
  await Comment.find({ profileid: req.params.id })
    .countDocuments()
    .then((result) => {
      res.send(result.toString());
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
