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
    const token = req.body.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, tokenKey);
        req.userID = decoded.userID;
        req.username = decoded.username;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

app.post('/register', (req, res) => {
    let data = req.body;
    data.data.password = crypto.createHash('md5').update(data.password).digest('hex');
    
    // TODO: Check if registration username is unique
    // TODO: Check if registration email is unique
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO users SET ?", data.data, (err, rows) => {
            connection.release();
            
            if (!err) {
                res.send({"success":true});
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
        connection.query("SELECT userID, password FROM users WHERE ?", {"username":data.username}, (err, rows) => {
            if (!err) {
            	if (rows.length == 1) {
            	    if (rows[0].password == data.password) {
            	        let token = jwt.sign({userID: rows[0].userID, username: data.username}, tokenKey, {expiresIn: "2h"});
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


app.post('/recordFood', verifyToken, (req, res) => {
    let data = req.body;
    data.data.ownerID = req.userID;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO foodRecords SET ?", data.data, (err, rows) => {
            if (!err) {
                res.send({"success":true});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/recordWeight', verifyToken, (req, res) => {
    let data = req.body;
    data.data.ownerID = req.userID;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO weightRecords SET ?", data.data, (err, rows) => {
            if (!err) {
                res.send({"success":true});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/recordExercise', verifyToken, (req, res) => {
    let data = req.body;
    data.data.ownerID = req.userID;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO exerciseRecords SET ?", data.data, (err, rows) => {
            if (!err) {
                res.send({"success":true});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getGoals', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT goals FROM users WHERE ?", {"userID":req.userID}, (err, userRows) => {
	    connection.query("SELECT * FROM goals WHERE goalID IN (" + userRows[0].goals.slice(1,-1) +  ")", (err, goalRows) => {
		if (!err) {
	            res.send({"success":true,"data":goalRows});
		} else {
		    console.log(err);
	            res.send({"success":false, "reason":"A database error has occurred."});
		}
	    })
	})
    })
});

app.post('/getFoods', verifyToken, (req, res) => {
    let data = req.body;
    delete data.token;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM foods", (err, rows) => {
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send([{"success":false, "reason":"A database error has occurred."}]);
            }
        })
    })
});

app.post('/getFoodRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM foodRecords WHERE ownerID = "+connection.escape(req.userID), (err, rows) => {
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send([{"success":false, "reason":"A database error has occurred."}]);
            }
        })
    })
});

app.post('/getWeightRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM weightRecords WHERE ownerID = "+connection.escape(req.userID), (err, rows) => {
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send([{"success":false, "reason":"A database error has occurred."}]);
            }
        })
    })
});

app.post('/getExerciseRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM exerciseRecords WHERE ownerID = "+connection.escape(req.userID), (err, rows) => {
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send([{"success":false, "reason":"A database error has occurred."}]);
            }
        })
    })
});

app.post('/test', verifyToken, (req, res) => {
    let data = req.body;
    
    //
});


app.listen(port, () => console.log(`Listening on port ${port}`))
