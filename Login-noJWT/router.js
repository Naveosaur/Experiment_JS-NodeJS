const e = require('express');
const express = require('express');
const router = express.Router();

const credential = {
    username: "admin",
    password: "admin"
}

// Login User
router.post('/login', (req, res) => {
    if(req.body.username == credential.username && req.body.password == credential.password) {
        req.session.user = req.body.username
        res.redirect('/route/dashboard');
    } else {
        res.end('Invalid Credentials');
    }
})

router.get('/dashboard', (req, res) => {
    if(req.session.user) {
        res.render('dashboard', {user: req.session.user})        
    } else {
        res.send("Please login first");
    }   
})

router.get('/logout',(req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err)
            res.send("error")
        } else {
            res.render('base', {logout: 'Login'})
        }
    })
})



module.exports = router;