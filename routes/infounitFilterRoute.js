var express = require('express');
var router = express.Router();
var passport = require('passport');
var filtertUnitController = require('../controller/filterUnitController');

//ruft aktuellsten eintrag einer Node auf
router.get('/node:id', passport.authenticate('jwt', {session: false}),filtertUnitController.get);

router.get('/count',passport.authenticate('jwt', {session: false}),filtertUnitController.count)
module.exports = router;