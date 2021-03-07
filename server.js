// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express();

//connect to Heroku database
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'xcqtoyzzdrwejn',
  host: 'ec2-54-90-13-87.compute-1.amazonaws.com',
  database: 'd3hsauj8i8ok81',
  password: 'c58307a93c448b0f3a1d1a373bbc2e28f867c446cda614e8d43303e474784813',
  port: 5432,
  "ssl": {
      "rejectUnauthorized": false,
  },
});

//set up bodyParser
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// set the view engine to ejs
app.set('view engine', 'ejs');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  const text = "Hello world";
  response.render(__dirname + "/views/index", {text:text});
});

//retrieve inventory list from Heroku database
app.get("/inventory", (request, response) => {
  pool.query('SELECT * FROM inventory', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.render(__dirname + "/views/dynamic", {items:results.rows});
  })
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + 3000);
});
