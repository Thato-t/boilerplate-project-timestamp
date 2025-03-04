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
  const date_string = req.params.date
  let date = new Date(date_string);
  let currentDate = new Date()

  if(date.toString() === 'Invalid Date'){
   const newDate = new Date(parseInt(date_string));
   res.json({
    unix: newDate.getTime(),
    utc: newDate.toUTCString()
   })
  } else if(date.toString() === 'Invalid Date'){
    res.json({ error: 'Invalid Date'})
  } else if(!date){
    res.json({
     unix: currentDate.getTime(),
     utc: currentDate.toUTCString()
    })
 }  else{
    res.json({
      unix: date.getTime(), 
      utc: date.toUTCString()
    })
  } 
});

// Listen on port set in environment variable or default to 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
