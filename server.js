const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(express.json());
const PORT = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Testing for challenge"));

app.get("/daysbetween", (req, res) => {
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  const diffTime = Math.abs(secondDate - firstDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  res.json(diffDays);
});

app.listen(PORT, () => {
  console.log(`App is ready to go at http://localhost:${PORT}`);
});
