var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');



exports.get = getLimit;

async function getLimit(req, res){
    var result = await limitModel.find({});
    res.jsonp(result);
}

exports.post = setLimit;

async function setLimit(req,res){
    var newLimitModel = new limitModel(req.body);
    newLimitModel.save();
    res.send("Limit erfolgreich gespeichert");
}