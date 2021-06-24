const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const Listing = require("./models/listing");
const cors = require("cors");
const listingRoute = require("./routes/listings");
const SteamStrategy = require("passport-steam").Strategy;
const util = require("util");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3001/auth/steam/return",
      realm: "http://localhost:3001/",
      apiKey: "28C78FC7E44A68621694CD3465C0D1E9",
    },

    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

//Middleware
//app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "ggez",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/listing", listingRoute);

//Routes
app.get("/user", function (req, res) {
  res.json({ user: req.user });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("http://localhost:3000/");
});

app.get("/fakeuser", (req, res) => {
  res.json({
    id: 123,
    name: "zsb",
    picture: "https://www.kumulos.com/wp-content/uploads/2013/10/pikachu-6.png",
  });
});

app.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

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
