var mongoose = require('mongoose');
var infounitModel = mongoose.model('infounit');

exports.get = function(req, res){
    
    // infounitModel.find().sort({'date': -1}).limit(1).exec(function(err, infounits){
    //     res.jsonp(infounits);
    // });
    var nodeid = req.params.id;
    infounitModel.findOne({'nodeid': nodeid}).sort({'date':-1}).limit(1).exec(function(err, infounits){
        res.jsonp(infounits);
    });
   

}

//gibt die die NodeID's der in der DB enthaltenen Nodes zurück
exports.count = function(req,res){
    infounitModel.distinct("nodeid").exec(function (err, count){
        res.jsonp(count);
    });

}