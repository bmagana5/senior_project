require('dotenv').config();

const PORT = process.env.PORT;
const MYSQL_HOST = process.env.HOST;
const MYSQL_PASSWD = process.env.MYSQL_PASSWD;
const MYSQL_USER = process.env.MYSQL_USER;

module.exports = {
    PORT,
    MYSQL_HOST,
    MYSQL_PASSWD,
    MYSQL_USER
}
