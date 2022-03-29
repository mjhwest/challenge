const express = require("express");
const bodyParser = require("body-parser");
const { resetWatchers } = require("nodemon/lib/monitor/watch");

var app = express();
app.use(express.json());
const PORT = 5000;

app.use(bodyParser.json());

// establish testing 'home' route
app.get("/", (req, res) => res.send("Testing for challenge"));

// 1. Find out the number of days between two datetime parameters & // 4. Accept a third parameter to convert the result of (1, 2 or 3) into one of seconds, minutes, hours, years.
app.get("/daysbetween", (req, res) => {
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  const units = req.body.units;

  //diffTime result in milliseconds (javacript date defaults to unix time in milliseconds)
  const diffTime = Math.abs(secondDate - firstDate);
  //covert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (req.body.units) {
    //  time unit displayed in seconds, convert from milli to seconds
    if (units == "seconds") {
      const timeInSeconds = diffTime / 1000;
      res.json(timeInSeconds);
    }
    // time unit displayed in mins, convert from milli to minutes
    if (units == "minutes") {
      const timeInMinutes = diffTime / 1000 / 60;
      res.json(timeInMinutes);
    }
    // unit displayed in hours, covert from milli to hours
    if (units == "hours") {
      const timeInHours = diffTime / 1000 / 60 / 60;
      res.json(timeInHours);
    }
    // unit display in years, convert from mill to years
    if (units == "years") {
      const timeInYears = diffTime / 1000 / 60 / 60 / 24 / 365;
      res.json(timeInYears);
    }
  } else {
    // result in full days
    res.json(diffDays);
  }
});

// 2. Find out the number of weekdays between two datetime parameters & // 4. Accept a third parameter to convert the result of (1, 2 or 3) into one of seconds, minutes, hours, years.
//function to figure out the number of weekdays in any given date period.
function getWeekDays(firstDate, secondDate) {
  let count = 0;
  if (secondDate < firstDate)
    return "Make sure you have the dates in the correct order :) ";
  //current date = new Date, new date is the first date using getTime (which is in miliseconds)
  const currentDate = new Date(firstDate.getTime());
  while (currentDate <= secondDate) {
    const dayOfWeek = currentDate.getDay();
    //getDay has default value of 0 for Sunday, 6 for Saturday, if day is 0 or 6 output expected to be false, and not included to count
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    //iterate the loop by 1 complete day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  //return the number of days.
  return count;
}

app.get("/getweekdays", (req, res) => {
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  const units = req.body.units;

  //use getWeekDays function to get full days
  const numberOfWeekDays = getWeekDays(firstDate, secondDate);

  //if units is included in json body 
  if (req.body.units) {
      //if seconds covert number of weekdays to seconds 
    if (units == "seconds") {
      const timeInSeconds = numberOfWeekDays * 24 * 60 * 60 ;
      res.json(timeInSeconds);
    }
    if (units == "minutes") {
        //if minutes, convert from weekdays to mins 
      const timeInMinutes = numberOfWeekDays * 24 * 60;
      res.json(timeInMinutes);
    }
    if (units == "hours") {
        //if hours, convert weekdays to hours 
      const timeInHours = numberOfWeekDays * 24;
      res.json(timeInHours);
    }
    if (units == "years") {
      const timeInYears = numberOfWeekDays / 365;
      res.json(timeInYears);
    }
  } else {
    res.json(numberOfWeekDays);
  }
});

// 3. Find out the number of complete weeks between two datetime parameters & // 4. Accept a third parameter to convert the result of (1, 2 or 3) into one of seconds, minutes, hours, years.
app.get("/completeweeks", (req, res) => {
  const firstDate = new Date(req.body.firstDate);
  const secondDate = new Date(req.body.secondDate);
  const units = req.body.units;
  const diffTime = Math.abs(secondDate - firstDate);
  //math.ceil to rund number to next largest integer
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //number of total days / 7 to get number of complete weeks
  //math.flor retruns the largest less than or equal to given number. 
  const completeweeks = Math.floor(diffDays / 7);

  if (req.body.units) {
    // unit in seconds, need to multiple a week to day, hours, mins, seconds
    if (units == "seconds") {
      const timeInSeconds = completeweeks * 7 * 24 * 60 * 60;
      res.json(timeInSeconds);
    }
    // units in mins, multiple by days, hours, mins.
    if (units == "minutes") {
      const timeInMinutes = completeweeks * 7 * 24 * 60;
      res.json(timeInMinutes);
    }
    //units in hours, multiply by days, hours.
    if (units == "hours") {
      const timeInHours = completeweeks * 7 * 24;
      res.json(timeInHours);
    }
    //units in years, divide by weeks
    if (units == "years") {
      const timeInYears = completeweeks / 52;
      res.json(timeInYears);
    }
  } else {
    res.json(completeweeks);
  }
});

app.listen(PORT, () => {
  console.log(`App is ready to go at http://localhost:${PORT}`);
});
