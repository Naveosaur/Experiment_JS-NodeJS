const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');

const router = require('./router.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Static Files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(session({
    secret: 'secret',
    resave: false, //
    saveUninitialized: true, // 
}))

app.use('/route', router)
// Home Router
app.get('/', (req, res) => {
    res.render('base', { title: 'Login' });
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})