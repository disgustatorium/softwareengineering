var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/pages/landing.html");
});

server.listen(3000, "localhost");
server.on("listening", function() {
    console.log("express server started on port %s at %s", server.address().port, server.address().address);
});
