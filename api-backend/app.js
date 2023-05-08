const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const app = express()
const port = 3001;
const tokenKey = "TotallyLegitKey";

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'fitquest'
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded.username;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

app.post('/register', (req, res) => {
    let data = req.body;
    data.password = crypto.createHash('md5').update(data.password).digest('hex');
    
    // TODO: Check if registration username is unique
    // TODO: Check if registration email is unique
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO users SET ?", data, (err, rows) => {
            connection.release();
            
            if (!err) {
            	let token = jwt.sign({username: data.username}, tokenKey, {expiresIn: "2h"});
                res.send({"success":true, "token":token});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/login', (req, res) => {
    let data = req.body;
    data.password = crypto.createHash('md5').update(data.password).digest('hex');
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM users WHERE ?", {"username":data.username}, (err, rows) => {
            if (!err) {
            	if (rows.length == 1) {
            	    if (rows[0].password == data.password) {
            	        let token = jwt.sign({username: data.username}, tokenKey, {expiresIn: "2h"});
            	    	res.send({"success":true, "token":token});
            	    } else { 
            	    	res.send({"success":false, "reason":"Invalid username and password combination."}) 
            	    }
            	} else {
            	    res.send({"success":false, "reason":"Invalid username and password combination."})
            	}
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/', verifyToken, (req, res) => {
   res.status(200).send("Welcome "+req.user+"!");
});


app.listen(port, () => console.log(`Listening on port ${port}`))
