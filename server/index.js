const path = require("path");

const express = require("express");
const { Z_BEST_SPEED } = require("zlib");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/user", (req, res) => {
  res.json({
    id: 69,
    name: "zsb",
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
