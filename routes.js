//ROUTE 1: 

const { response } = require("express");

// Find out the number of days between two datetime parameters.
app.get('/daysbetween', (req, res) => {
    const firstDate = new Date(2008, 1, 12);
    const secondDate = new Date(2008, 1, 22);
    const diffTime = Math.abs(secondDate - firstDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
})

// ROUTE 2: 
// Find out the number of weekdays between two datetime parameters.

// ROUTE 3: 
// Find out the number of complete weeks between two datetime parameters.

// ROUTE 4: 
// 4. Accept a third parameter to convert the result of (1, 2 or 3) into one of
// seconds, minutes, hours, years.

// ROUTE 5: 
// Allow the specification of a timezone for comparison of input parameters from
// different timezones.

