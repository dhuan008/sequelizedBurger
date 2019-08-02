// Import MySQL connection
const connection = require('./connection.js');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = num => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
const objToSql = ob => {
    const arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        arr.push(`${key} = ${ob[key]}`);
    }
    return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
    // Function that returns all table entries
    selectAll: (tableInput, cb) => {
        let queryString = `SELECT * FROM ${tableInput};`;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    // Function that insert a single table entry
    insertOne: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    // Function that updates a single table entry
    updateOne: (table, objColVals, condition, cb) => {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

// Export the orm object
module.exports = orm;