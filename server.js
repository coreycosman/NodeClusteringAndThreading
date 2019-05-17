const crypto = require("crypto");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("yo sup");
  });
});
app.get("/fast", (req, res) => {
  res.send("yo sup fast route");
});
app.listen(3000);
