const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospitaldatabase'
});


const connect = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log("Error in connection with database", err);
            } else {
                console.log("Connection established with database");
            }
        })
    })
}

module.exports = { connection, connect }