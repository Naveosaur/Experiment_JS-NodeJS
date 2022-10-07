const mysql = require('mysql');


// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})


// view User
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected as ID: ${connection.threadId}`);
        // User the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            // Release connection when done
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

// Find User
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected as ID: ${connection.threadId}`);

        let searchTerm = req.body.search;

        // User the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? or last_name LIKE ?', ['%' + searchTerm + '%'], ['%' + searchTerm + '%'], (err, rows) => {
            // Release connection when done
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

// Form
exports.form = (req, res) => {
    res.render('addUser');
}
// Add new user
exports.save = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Connected as ID: ${connection.threadId}`);

        let searchTerm = req.body.search;

        // User the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // Release connection when done
            connection.release();
            if (!err) {
                res.render('home')
            } else {
                console.log(err);
            }
        })
    })
}
