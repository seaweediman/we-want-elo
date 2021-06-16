const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    steamid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const listing = mongoose.model("Listing", listingSchema);
module.exports = listing;
