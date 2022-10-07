const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser'); 
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Templating Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
})

const router = require('./server/routes/user.js');
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})