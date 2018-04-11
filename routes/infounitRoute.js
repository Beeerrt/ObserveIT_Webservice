var express = require('express');
var router = express.Router();
var passport = require('passport');


var infounitcontroller = require('../controller/infounitController');


//Speicher eine Unit
//Benötigt keine authentifizierung, da Sensornetzwerk Daten abspeichern muss
router.post('/',  infounitcontroller.post);

//get alle Untis
router.get('/',passport.authenticate('jwt', {session: false}), infounitcontroller.get);

//get einer bestimmten infounit
router.get('/:infounitId',passport.authenticate('jwt', {session: false}), infounitcontroller.show);


// Put infounit/id
router.put('/:infounitId',passport.authenticate('jwt', {session: false}), infounitcontroller.put);

//Delete infounit/Id
router.delete('/:infounitId',passport.authenticate('jwt', {session: false}), infounitcontroller.delete);
module.exports = router;