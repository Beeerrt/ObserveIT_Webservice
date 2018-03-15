var express = require('express');
var router = express.Router();
var telegramUser = require(__base + 'models/telegramUserModel');
var config = require(__base + 'config/database');


//get Profile
router.get('/test', function(req, res, next){
    console.log(req);
    res.send('Hallo Test');
    });

module.exports = router;
    
    