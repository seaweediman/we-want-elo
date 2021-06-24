const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
