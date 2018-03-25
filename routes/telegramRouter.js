var express = require('express');
var router = express.Router();
var telegramUser = require('../models/telegramUserModel');
var telegramStatus = require('../models/telegramStatusModel');
var config = require('../config/database');

var telegramController = require('../controller/telegramController');

//get all TelegramUser
router.get('/', telegramController.get);

//get TelegramUser by ID
// router.get('/', telegramController.get);


//Save new TelegramUser
router.post('/', telegramController.post);

router.delete('/:telegramid', telegramController.delete);

router.get('/status', telegramController.getStatus);

router.post('/status',telegramController.setStatus);

module.exports = router;
    
    