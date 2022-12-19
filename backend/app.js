const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./controllers/router');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWD
});

con.connect((err) => {
    if (err) throw err;
    console.log('mysql connected!');
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/app', router);

module.exports = app;

