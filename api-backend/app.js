const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const { NONAME } = require('dns');

require('dotenv').config(); 

const app = express()
const port = 3001;
const tokenKey = "TotallyLegitKey";

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    exposedHeaders: ['Authorization'],
    credentials: true
};

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'fitquest',
    dateStrings     : [ "DATE",
    			"DATETIME" ]
});

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: 'healthtrackerappuea@gmail.com',
      pass: process.env.GMAIL_PASSWORD, 
    },
  });

app.use(cookieParser());
app.use(cors(corsOptions));
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
  
app.post('/send-email', bodyParser.json(), (req, res) => {
    const data = req.body;

    const file = data.file;
    const name = data.name;
    
    const folderPath = 'emailhtml';
    const filePath = path.join(folderPath, file); 
  
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).json({ error: 'Failed to read HTML file' });
            return;
        }

        // replaces variable with actual name 
        const modifiedHtmlContent = htmlContent.replace(/{{name}}/g, name);

        const mailOptions = {
            from: 'healthtrackerappuea@gmail.com',
            to: data.to,
            name: data.name,
            subject: data.subject,
            html: modifiedHtmlContent,  
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email', reason: error.reason });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
            });
        });
  });
  
app.post('/register', bodyParser.json(), (req, res) => {
    let data = req.body;
    data.password = crypto.createHash('md5').update(data.password).digest('hex');

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO users SET ?", data, (err, rows) => {           
            if (!err) {
                res.send({"success":true});
            } else {
                console.log(err);
                connection.query("SELECT * FROM USERS WHERE ?", {"username":data.username}, (err, userRows) => {
                    connection.query("SELECT * FROM USERS WHERE ?", {"email":data.email}, (err, emailRows) => {
                        if (emailRows.length == 0) {
                            res.send({"success":false, "reason":"Email already in use."});
                        } else if (userRows.length == 0) {
                            res.send({"success":false, "reason":"Username already in use."});
                        } else {
                            res.send({"success":false, "reason":"A fatal database error has occurred."});
                        }
                    })
                })
                
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
            connection.release()
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
            connection.release()
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
            connection.release()
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
            connection.release()
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
	    connection.query("SELECT * FROM goals WHERE goalID IN (" + userRows[0].goals +  ")", (err, goalRows) => {
	        connection.release()
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
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM foods", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getFoodRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM foodRecords WHERE ownerID = "+req.userID+" ORDER BY dateRecorded", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getWeightRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM weightRecords WHERE ownerID = "+req.userID+" ORDER BY dateRecorded", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getExerciseRecords', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM exerciseRecords WHERE ownerID = "+req.userID+" ORDER BY dateRecorded", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/registerGoal', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO goals SET ?", data.data, (err, goalReturn) => {
            if (!err) {
            	console.log(goalReturn.insertId);
                connection.query("UPDATE users SET goals = CONCAT(goals,',"+goalReturn.insertId+"') WHERE userID = "+req.userID, (err, userReturn) => {
                    connection.release()
                    if (!err) {
                    	res.send({"success":true});
                    } else {
                        console.log(err);
                    	res.send({"success":false, "reason":"A database error has occurred."});
                    }
                })
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
                connection.release()
            }
        })
    })
});

app.post('/createGroup', verifyToken, (req, res) => {
    let data = req.body;
    groupJson = {"groupName":data.groupName,"ownerID":req.userID};
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO groups SET ?", groupJson, (err, rows) => {
            connection.release()
            if (!err) {
            	res.send({"success":true});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/joinGroup', verifyToken, (req, res) => {
    let data = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM groups WHERE ?", {"groupID":data.groupID}, (err, rows) => {
            if (!err) {
                if (rows.length == 1 && !rows[0].memberIDs.split(",").includes(req.userID) && rows[0].ownerID != req.userID) {
            	    connection.query("UPDATE groups SET memberIDs = CONCAT(memberIDs,',"+req.userID+"') WHERE groupID = "+connection.escape(data.groupID), (err, rows) => {
            	        connection.release()
                        if (!err) {
                        	res.send({"success":true});
                        } else {
                            console.log(err);
                        	res.send({"success":false, "reason":"A database error has occurred."});
                        }
                    })
            	} else {
            	    res.send({"success":false, "reason":"No group found, or you are already a member."});
            	    connection.release()
            	}
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
                connection.release()
            }
        })
    })
});

app.post('/getGroups', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM `groups` WHERE memberIDs REGEXP '(,"+req.userID+")(?![0123456789])' OR ownerID ="+req.userID, (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getExerciseMonthly', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT SUM(hours) AS hours, LEFT(dateRecorded,7) AS dateRecorded FROM exerciseRecords WHERE ownerID ="+req.userID+" GROUP BY MONTH(dateRecorded), YEAR(dateRecorded) ORDER BY dateRecorded", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getCaloriesMonthly', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT SUM(quantity * calPerQuantity) AS calories, LEFT(dateRecorded,7) AS dateRecorded FROM foodRecords INNER JOIN foods ON foodRecords.foodType=foods.foodID WHERE ownerID ="+req.userID+" GROUP BY MONTH(dateRecorded), YEAR(dateRecorded) ORDER BY dateRecorded", (err, rows) => {
            connection.release()
            if (!err) {
                res.send({"success":true,"data":rows});
            } else {
                console.log(err);
                res.send({"success":false, "reason":"A database error has occurred."});
            }
        })
    })
});

app.post('/getUsers', verifyToken, (req, res) => {
    let data = req.body;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT username FROM users WHERE userID IN (" + connection.escape(data.users.toString()).slice(1,-1) +  ")", (err, rows) => {
          connection.release()
	  if (!err) {
	    var dataString = ""
	    for (var row of rows) {
	      dataString += row.username + ", ";
	    }
	    if (dataString == "") dataString = "None, "; 
            res.send({"success":true,"data":dataString.slice(0, -2)});
          } else {
            console.log(err);
	    res.send({"success":false, "reason":"A database error has occurred."});
          }
        })
    })
});

app.post('/test', (req, res) => {
    let data = req.body;
    console.log(data);
});


app.listen(port, () => console.log(`Listening on port ${port}`))
