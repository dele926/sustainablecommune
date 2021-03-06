// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

//app.put("/customerlogin", ())

var Connection = require('tedious').Connection
var Request = require('tedious').Request

var config = {
  server: 'ec2-54-90-13-87.compute-1.amazonaws.com',
  authentication: {
    type: 'default',
    options: {
      userName: 'xcqtoyzzdrwejn', // update me
      password: 'c58307a93c448b0f3a1d1a373bbc2e28f867c446cda614e8d43303e474784813' // update me
    }
  }
}

var connection = new Connection(config)

connection.on('connect', function (err) {
  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("SELECT * from inventory;", function (err, rowCount) {
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
    }
    connection.close()
  })

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })
  connection.execSql(request)
}


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
