const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const Listing = require("./models/listing");
const cors = require("cors");
const listingRoute = require("./routes/listings");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const util = require("util");
const session = require("express-session");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//Middleware
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(cors());
app.use("/listing", listingRoute);
app.use("/auth", authRoutes);

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: "28C78FC7E44A68621694CD3465C0D1E9",
    },
    function (identifier, profile, done) {
      User.findByOpenID({ openId: identifier }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get("/", function (req, res) {
  res.json({ user: req.user });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/user", (req, res) => {
  res.json({
    id: 123,
    name: "zsb",
    picture: "https://www.kumulos.com/wp-content/uploads/2013/10/pikachu-6.png",
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html")); // <============ THIS LINE
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
