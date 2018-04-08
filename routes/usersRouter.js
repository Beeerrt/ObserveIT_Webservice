var express = require('express');
var router = express.Router();
var UserModel = require('../models/userModel');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var usercontroller = require('../controller/userController');

router.post('/register', passport.authenticate('jwt', {session: false}) ,usercontroller.post);

router.post('/authenticate',usercontroller.authenticate)

router.get('/profile/:username',  passport.authenticate('jwt', {session: false}) ,usercontroller.getProfile)
 
router.put('/profile',  passport.authenticate('jwt', {session: false}),usercontroller.setProfile)


router.get('/', function(req, res, next) {
  res.send('<h1>Hallo</h1>');
});

// #endregion

module.exports = router;


//Um eine Route vor ungewünschten Zugriffen zu sichern wird in der Route 
// passport.authenticate('jwt', {session: false}) als parameter mitübergeben
//Dies Überprüft das Token, welches in der Payload steht.