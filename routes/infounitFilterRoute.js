var express = require('express');
var router = express.Router();

var filtertUnitController = require('../controller/filterUnitController');

//ruft aktuellsten eintrag einer Node auf
router.get('/:id', filtertUnitController.get);


module.exports = router;