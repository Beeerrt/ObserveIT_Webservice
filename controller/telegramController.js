var mongoose = require('mongoose');
var telegramUserModel = mongoose.model('TelegramUser');
var telegramStatusModel = mongoose.model('TelegramStatus');


/**
 * Lädt den aktuellen Aktivierungsstatus des Benachrichtigung Service
 * @param {*} req 
 * @param {*} res 
 */
exports.getStatus = async function (req, res){
    var status = await telegramStatusModel.find({});
    res.jsonp(status);
}

/**
 * Setzt den Aktiverungsstatus des Benachrichtigung Service
 * @param {*} req 
 * @param {*} res 
 */
exports.setStatus = async function (req,res){
    
    //laden des aktuelle Status
    var currentStatus = await telegramStatusModel.find({});
    var query = {_id : currentStatus[0]._id};
    var value = {$set: {status: req.body.status}};
    
    var result= await telegramStatusModel.updateOne(query,value);
    
    console.log(result.ok);
    if(result.ok ==1)
    {
        res.send({success: true, msg: 'Service erfolgreich geändert'});
    }
    else{
        res.send({success: false, msg: 'Service konnte nicht geändert werden'});
    }
}

/**
 * Liefert alle TelegramUser zurück
 * @param {*} req 
 * @param {*} res 
 */
exports.get = async function (req, res){
    var result = await telegramUserModel.find({});
    res.jsonp(result);
}

/**
 * Speichert übergebenen TelegramUser in der Datenbank ab
 * @param {*} req 
 * @param {*} res 
 */
exports.post = async function (req,res){
    var newTelegramUserModel = new telegramUserModel(req.body);
     newTelegramUserModel.save();
     res.send({success: true, msg: 'TelegramUser erfolgreich geändert'});
    }

/**
 * Löscht übergebenen TelegramUser in der Datenbank
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async function (req,res){

    console.log(req.params.telegramid);

    telegramUserModel.load(req.params.telegramid, function(err, telegramuser)
    {
        telegramuser.remove(function(err){
            if(err){
                res.send({success: false, msg: 'TelegramUser konnte nicht gelöscht werden'});
               }
               else{
                res.send({success: true, msg: 'TelegramUser erfolgreich gelöscht'});
               }
        })    
    });
}