// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
    let { date } = req.params;

  let dateObj;

  // If no date param is provided, use current time
  if (!date) {
    dateObj = new Date();
  } else {
    // Check if it's a unix timestamp (numeric string)
    if (!isNaN(date)) {
      date = parseInt(date); // Convert to number
    }
    dateObj = new Date(date);
  }

  // Handle invalid date
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
