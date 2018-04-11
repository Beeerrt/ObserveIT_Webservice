var mongoose = require('mongoose');
var limitModel = mongoose.model('limit');


/**
 * Laden der aktuellen Limits 
 * @param {*} req 
 * @param {*} res 
 */
exports.get = async function getLimit(req, res){
    var result = await limitModel.find({});
    res.jsonp(result);
}

/**
 * Updaten des Limits Dokument in der Datenbank
 * @param {*} req 
 * @param {*} res 
 */
 exports.post = async function setLimit(req,res){

    //laden des aktuelle Status
    var currentLimits = await limitModel.find({});
    
    //update Query erstellen
    var query = {_id : currentLimits[0]._id};
    var value = {$set: {maxTemperatur: req.body.maxTemperatur,
                        minTemperatur: req.body.minTemperatur,
                        avgIncline: req.body.avgIncline,
                        maxHumidity: req.body.maxHumidity,
                        minHumidity: req.body.minHumidity,
                        maxBrightness: req.body.maxBrightness,
                        minBrightness: req.body.minBrightness,
                        batterylevel: req.body.batterylevel}};
    
    //Update durchführen
    var result= await limitModel.updateOne(query,value);

    //Prüfen ob Update Vorgang erfolgreich war
    if(result.ok ==1)
    {
        res.send({success: true, msg: 'Limits erfolgreich geändert'});
    }
    else{
        res.send({success: false, msg: 'Limits konnte nicht geändert werden'});
    }
}