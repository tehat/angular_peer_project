/**
 * Created by Thomas on 11/11/15.
 */
var express = require("express");
var app = express();

var path = require('path');
var bodyParser = require("body-parser");

var pg = require("pg");
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/Zeta_Cohort';


app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));




app.get('/data', function(req, res){

    var results = [];


    pg.connect(connectionString, function (err, client) {
        var query = client.query("SELECT * FROM zeta_people");

        console.log("TRYING TO CONNECT TO DATA", query);


        query.on('row', function (row) {
            results.push(row);
        });


        query.on('end', function () {
            client.end();
            return res.json(results);
        });


        if (err) {
            console.log(err);
        }

    });
    console.log("speaking to the data base");
});








app.get("/*", function(req,res,next){
    console.log("Here is the asset I needs: " , req.params);
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file))
});

app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;