const mysql = require('mysql');
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'lrq530200',
    database:'bs_db'
});
module.exports = db;