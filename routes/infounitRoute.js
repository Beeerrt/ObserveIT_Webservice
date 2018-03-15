var express = require('express');
var router = express.Router();

var infounitcontroller = require(__base + 'Controller/infounitController.js');


//Speicher eine Unit
router.post('/',  infounitcontroller.post);

//get alle Untis
router.get('/', infounitcontroller.get);

//get einer bestimmten infounit
router.get('/:infounitId', infounitcontroller.show);


// Put infounit/id
router.put('/:infounitId', infounitcontroller.put);

//Delete infounit/Id
router.delete('/:infounitId', infounitcontroller.delete);
module.exports = router;