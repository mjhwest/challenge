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
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  //return result in milliseconds (javacript date defaults to unix time in milliseconds)
  const diffTime = Math.abs(secondDate - firstDate);
  //covert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //result in full days
  res.json(diffDays);
});

// 2. Find out the number of weekdays between two datetime parameters.
app.get("/getweekdays", (req, res) => {
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  const numberOfWeekDays = getWeekDays(firstDate, secondDate);
  res.json(numberOfWeekDays);
});

//function to figure out the number of weekdays in any given date period.
function getWeekDays(firstDate, secondDate) {
  //start count at 0
  let count = 0;
  //current date = new Date, new date is the first date using getTime (which is in miliseoncds)
  const currentDate = new Date(firstDate.getTime());
  while (currentDate <= secondDate) {
    const dayOfWeek = currentDate.getDay();
    //getDay has default value of 0 for Sunday, 6 for Saturday, if day is 0 or 6 output expected to be fulse, and not included to count
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    //set date of current date and 1 for count for every extra day thats not value 0 or 6
    currentDate.setDate(currentDate.getDate() + 1);
  }
  //return the count 
  return count;
}

// 3. Find out the number of complete weeks between two datetime parameters.


app.listen(PORT, () => {
  console.log(`App is ready to go at http://localhost:${PORT}`);
});
