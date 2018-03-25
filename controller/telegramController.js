var mongoose = require('mongoose');
var telegramUserModel = mongoose.model('TelegramUser');
var telegramStatusModel = mongoose.model('TelegramStatus');


exports.getStatus = getStatus;

async function getStatus(req, res){
    var status = await telegramStatusModel.find({});
    res.jsonp(status);
}


exports.setStatus = setStatus;

async function setStatus(req,res){
    
    //laden des aktuelle Status
    var currentStatus = await telegramStatusModel.find({});
    //console.log(currentStatus[0]._id);
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
    //currentTelegramStatus.updateOne(query,value);
    //res.send(result);
    //var newtelegramStatusModel = new telegramStatusModel(req.body);


    //newtelegramStatusModel.save();
    //res.send({success: true, msg: 'Benachrichtungsstatus erfolgreich geändert'});
}

exports.get = getTelegramUser;

async function getTelegramUser(req, res){
    var result = await telegramUserModel.find({});
    res.jsonp(result);
}

exports.post = setTelegramUser;

async function setTelegramUser(req,res){
    var newTelegramUserModel = new telegramUserModel(req.body);
     newTelegramUserModel.save();
     res.send({success: true, msg: 'TelegramUser erfolgreich geändert'});
    }

exports.delete = deleteTelegramUser;
async function deleteTelegramUser(req,res){

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