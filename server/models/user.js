const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const listing = mongoose.model("User", userSchema);
module.exports = listing;
