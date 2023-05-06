const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = 3001;

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'fitquest'
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from users', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log(rows)
        })
    })
})


app.listen(port, () => console.log(`Listening on port ${port}`))
