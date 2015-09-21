var express = require('express');
var passport = require('passport');
var router = express.Router();

var usersController = require('../controllers/usersController')

router.post('/login', usersController.login);
router.post('/signup', usersController.signUp);

module.exports = router;
