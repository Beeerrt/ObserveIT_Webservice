var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');


exports.get = async function getLimit(req, res){
    var result = await limitModel.find({});
    res.jsonp(result);
}

 exports.post = async function setLimit(req,res){

    //laden des aktuelle Status
    var currentLimits = await limitModel.find({});
    //console.log(currentStatus[0]._id);
    var query = {_id : currentLimits[0]._id};
    console.log(req.body.minBrightness);
    var value = {$set: {maxTemperatur: req.body.maxTemperatur,
                        minTemperatur: req.body.minTemperatur,
                        avgIncline: req.body.avgIncline,
                        maxHumidity: req.body.maxHumidity,
                        minHumidity: req.body.minHumidity,
                        maxBrightness: req.body.maxBrightness,
                        minBrightness: req.body.minBrightness}};
    
    var result= await limitModel.updateOne(query,value);


    if(result.ok ==1)
    {
        res.send({success: true, msg: 'Limits erfolgreich geändert'});
    }
    else{
        res.send({success: false, msg: 'Limits konnte nicht geändert werden'});
    }

}