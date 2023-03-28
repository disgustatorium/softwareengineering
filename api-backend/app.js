const fs = require("fs");
const express = require("express");

// DB
const sqlite3 = require("sqlite3");
db = new sqlite3.Database("database.db");

// Routes
app = express();

app.get("/", (req, res) => {
	res.send("Hi");
});

app.get("/example1", (req, res) => {
	var body = "";
	db.each("SELECT rowid AS id, info FROM example", (err, row) => {
		body += row.id+": "+row.info+"<br>";
	}, () => {
		res.send(body);
	});
});

app.get("/example2", (req, res) => {
	const statement = db.prepare("INSERT INTO example VALUES (?)");
	for (let i = 0; i < 3; i++) {
		statement.run("Example "+i);
	}
	statement.finalize();
	res.send("Inserted");
	console.log("Inserted");
});

app.get("/example3", (req, res) => {
	db.run("DELETE FROM example");
	res.send("Emptied");
});

// 404 route
app.use((req, res, next) => {
	res.status(404).send("Not found");
});

app.listen(3001, function() {
	console.log("listening on port 3001");
});
