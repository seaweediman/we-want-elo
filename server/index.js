const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const listingRoute = require("./routes/listings");
const commentRoute = require("./routes/comments");
const userRoute = require("./routes/users");
const SteamStrategy = require("passport-steam").Strategy;
const User = require("./models/user");
const util = require("util");

var environment = process.env.NODE_ENV || "dev";

const returnURL =
  environment !== "dev"
    ? "https://we-want-elo-too.herokuapp.com/auth/steam/return"
    : "http://localhost:3001/auth/steam/return";

const realmString =
  environment !== "dev"
    ? "https://we-want-elo-too.herokuapp.com/"
    : "http://localhost:3001/";

const frontEndURL =
  environment !== "dev"
    ? "https://we-want-elo-too.herokuapp.com/"
    : "http://localhost:3000/";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "https://we-want-elo-too.herokuapp.com/auth/steam/return",
      realm: "https://we-want-elo-too.herokuapp.com/",
      apiKey: "E28EF76C5D4A657372199FD32C66E2C4",
    },

    function (identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(async function () {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        let user = await User.findOne({ steamid: profile.id });
        if (!user) {
          const newUser = new User({
            steamid: profile.id,
            steamprofile: profile,
            bio: "No information given.",
            rating: 0,
          });

          await newUser
            .save()
            .then((result) => {
              res.send(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return done(null, profile);
      });
    }
  )
);

//Middleware

app.use(
  cors({
    origin: "https://we-want-elo-too.herokuapp.com/", // allow to server to accept request from different origin
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
app.use("/comment", commentRoute);
app.use("/users", userRoute);

//Routes
app.get("/user", function (req, res) {
  res.json({ user: req.user });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("https://we-want-elo-too.herokuapp.com/");
});

app.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("https://we-want-elo-too.herokuapp.com/");
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
    res.redirect("https://we-want-elo-too.herokuapp.com/");
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
  console.log(`This is ${environment}`);
  console.log(`Server listening on ${PORT}`);
});
