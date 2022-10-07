const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


// Route
router.get('/', userController.view);
router.post('/' , userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.save);

module.exports = router;