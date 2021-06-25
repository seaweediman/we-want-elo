const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: {
    type: String,
    required: true,
  },
  steamprofile: {
    type: Object,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
