const mysql = require('mysql2');

const db = mysql.createConnections({
    host: 'localhost',
    user: 'root',
    password: 'magic',
    database: 'employees'
});

module.exports = db;