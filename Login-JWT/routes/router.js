const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/db.js');
const userMiddleware = require('../middleware/user.js');
const { validateRegister } = require('../middleware/user.js');


router.post('/register', validateRegister, (req, res, next) => {
    db.query('SELECT id from users WHERE LOWER(username) = LOWER(?)', [req.body.username], (err, result) => {
        if(result.length) {
            return res.status(409).send({
                msg: 'username sudah digunakan'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).send({
                        msg: err
                    });
                } else {
                    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, hash], (err, result) => {
                        if(err) {
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        res.status(201).send({
                            msg: 'user berhasil dibuat'
                        })
                    })
                }
            })
        }
    });
});


router.post('/login', (req, res, next) => {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, result) => {
        if(err) {
            return res.status(400).send({
                msg: err
            });
        }
        if(!result.length) {
            return res.status(401).send({
                msg: 'username atau password salah'
            });
        }

        bcrypt.compare(req.body.password, result[0].password, (bErr, bResult) => {
            if(bErr) {
                return res.status(401).send({
                    msg: 'username atau password salah'
                });
            }
            if(bResult) {
                const token  = jwt.sign({
                    username: result[0].username,
                    userId: result[0].id
                }, 'SECRETKEY', 
                { expiresIn: '1d' }
                );
                return res.status(200).send({
                    msg: 'login berhasil',
                    token,
                    user: result[0]
                });
            }
            return res.status(401).send({
                msg: 'username atau password salah'
            });
        })
    });
});

router.get('/secret-route', loggedIn, (req, res, next) => {
    res.send
});