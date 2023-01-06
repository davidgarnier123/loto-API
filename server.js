// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");

var cheerio = require("cheerio");

// Create new instance of the express server
var app = express();

const http = require('http');

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());


app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });
// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get("/getLotoData", function (req, res) {
    http.get("http://loto.akroweb.fr/loto-historique-tirages/", function(html) {
      let dataString = '';
      console.log(html.statusCode);
      html.setEncoding('utf8');
      html.on('data', function (chunk) {
        if(chunk != null && chunk != "") {
            dataString += chunk;
        } 
      });
      html.on('end', function () {
        let results = [];
        const $ = cheerio.load(dataString);
        $('tr', dataString).each(function(index, element) {
          const tds = $(element).find('td');
          let tirage = {
            date :  $(tds[2]).text(),
            numbers : [$(tds[4]).text() , $(tds[5]).text(), $(tds[6]).text(), $(tds[7]).text(), $(tds[8]).text()],
            chance : $(tds[9]).text()
          }
          results.push(tirage);
        })
        res.send({data: results});
      });
    }).on('error', function(err) {
        console.log(err);
    });
    
});