var express = require('express');
var router = express.Router();
var passport = require('passport');
var telegramUser = require('../models/telegramUserModel');
var telegramStatus = require('../models/telegramStatusModel');
var config = require('../config/database');

var telegramController = require('../controller/telegramController');

//get all TelegramUser
router.get('/', passport.authenticate('jwt', {session: false}), telegramController.get);

//get TelegramUser by ID
// router.get('/', telegramController.get);


//Save new TelegramUser
router.post('/',  passport.authenticate('jwt', {session: false}), telegramController.post);

router.delete('/:telegramid', passport.authenticate('jwt', {session: false}) ,telegramController.delete);

router.get('/status',  passport.authenticate('jwt', {session: false}),telegramController.getStatus);

router.post('/status', passport.authenticate('jwt', {session: false}), telegramController.setStatus);

module.exports = router;
    
    