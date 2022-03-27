const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(express.json());
const PORT = 5000;

app.use(bodyParser.json());

// establish testing 'home' route
app.get("/", (req, res) => res.send("Testing for challenge"));

// 1. Find out the number of days between two datetime parameters.
app.get("/daysbetween", (req, res) => {
  // first date
  const firstDate = new Date(req.body.firstDate);
  //second date
  const secondDate = new Date(req.body.secondDate);
  //return result in milliseconds (javacript date defaults to unix time in milliseconds)
  const diffTime = Math.abs(secondDate - firstDate);
  //covert milliseconds to days 
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //result in full days 
  res.json(diffDays);
});

// 2. Find out the number of weekdays between two datetime parameters.





app.listen(PORT, () => {
  console.log(`App is ready to go at http://localhost:${PORT}`);
});
