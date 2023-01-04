const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const middleware = require('./utils/middleware');

const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWD,
    database: config.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.static('build'));
app.use('/images', express.static('img'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/signup', require('./controllers/signup')(pool.promise()));
app.use('/api/login', require('./controllers/login')(pool.promise()));
app.use('/api/app', require('./controllers/app')(pool.promise()));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

