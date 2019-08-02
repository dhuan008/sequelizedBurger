// Set up MySQL connection.
const mysql = require('mysql');

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: '!qaz2wsx#EDC',
        database: 'burgers_db'
    })
};

// Make connection.
connection.connect(err => {
    if (err) {
        console.error(`MySQL connection error: ${err.stack}\n\n`);
    }
    else {
        console.log(`Connected as id: ${connection.threadId}\n\n`);
    }
});

// Export connection for our ORM to use.
module.exports = connection;
