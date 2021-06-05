const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//Middleware
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());

//Routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/user", (req, res) => {
  res.json({
    id: 123,
    name: "zsb",
    picture: "https://www.kumulos.com/wp-content/uploads/2013/10/pikachu-6.png",
  });
});

app.get("/make-listing", (req, res) => {
  const listing = new Listing({
    game: "Apex",
    rank: "Diamond 3",
    desc: "Help me reach Masters",
  });

  listing
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-listings", (req, res) => {
  Listing.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

//Listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
