const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    commentername: {
      type: String,
      required: true,
    },
    commenterid: {
      type: String,
      required: true,
    },
    profileid: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const listing = mongoose.model("Comment", commentSchema);
module.exports = listing;
