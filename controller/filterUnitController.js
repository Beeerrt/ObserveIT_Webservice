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
