var express = require('express');
var router = express.Router();
var limitModel = require('../models/limitModel');
var limitController = require('../controller/limitController');

//Get Limits
router.get('/', limitController.get);


//Set Limits
router.post('/', limitController.post);


module.exports = router;