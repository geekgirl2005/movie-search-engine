var express = require("express");
var app = express();

var request = require("request"); //request is designed to simplify making http calls
app.set("view engine", "ejs");

app.get("/results", function(req, res) {
    var query = req.query.movieTitle; //we req.query when info comes from a form
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    //var url = "http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb";
    request(url, function (error, response, body) {
        //body => res.send(body); body is a string so we need to convert into object to be able to access particula parts
        //body will display all the info that the http request contains 
        if(!error & response.statusCode == 200) {
            var data = JSON.parse(body);
            //res.send(result["Search"][0]["Title"]); // will display the first object in a search array
            res.render("results", {data: data});
        }
    });
});


app.get("/", function(req, res) {
    res.render("search");
});

//to run a server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running now!");
})