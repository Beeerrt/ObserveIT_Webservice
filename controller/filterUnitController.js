var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');


/**
 * Laden des aktuellsten Infounit anhand der InfounitID
 * @param {*} req 
 * @param {*} res 
 */
exports.get = function(req, res){
    var nodeid = req.params.id;
    infounitModel.findOne({'nodeid': nodeid}).sort({'date':-1}).limit(1).exec(function(err, infounits){
        res.jsonp(infounits);
    });
}

/**
 * Liefert alle in der Datenbank enthaltenen NodeIDs zurück
 * @param {*} req 
 * @param {*} res 
 */
exports.count = function(req,res){
    infounitModel.distinct("nodeid").exec(function (err, count){
        res.jsonp(count);
    });
}