var express = require('express');
var router = express.Router();
var passport = require('passport');
var limitModel = require('../models/limitModel');
var limitController = require('../controller/limitController');

//Get Limits
router.get('/', passport.authenticate('jwt', {session: false}) ,limitController.get);


//Set Limits
router.post('/',  passport.authenticate('jwt', {session: false}),limitController.post);


module.exports = router;