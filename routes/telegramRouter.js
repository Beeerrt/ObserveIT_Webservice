var express = require('express');
var router = express.Router();
var telegramUser = require('../models/telegramUserModel');
var config = require('../config/database');


//get Profile
router.get('/test', function(req, res, next){
    console.log(req);
    res.send('Hallo Test');
    });

module.exports = router;
    
    