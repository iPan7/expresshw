const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.get("/reservations", function (req, res) {
  let rawData = fs.readFileSync("db.json");
  res.send(JSON.parse(rawData));
});

app.post("/reservations", function (req, res) {
  const newReservations = req.body;
  let rawData = fs.readFileSync("db.json");
  let jsonData = JSON.parse(rawData);
  jsonData.push(newReservations);
  fs.writeFileSync("db.json", JSON.stringify(jsonData));
  res.json(jsonData);
});

app.delete("/reservations", function (req, res) {
  fs.writeFileSync("db.json", JSON.stringify([]));
  res.send("Deleted");
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
