var express = require('express');
var router = express.Router();

var filtertUnitController = require(__base + 'controller/filterUnitController');

//ruft aktuellsten eintrag einer Node auf
router.get('/node:id', filtertUnitController.get);

router.get('/count',filtertUnitController.count)
module.exports = router;