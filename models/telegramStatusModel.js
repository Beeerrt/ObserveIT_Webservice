var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

//DatenbankSchema definieren

var telegramStatusSchema = mongoose.Schema({
    status: {
        type: Boolean,
        required: true
    }
});
    
telegramStatusSchema.statics = {
    load: function(cb){
        this.find({}).exec(cb);
    }
};

//Model für andere Komponenten verfügbar machen
var telegramStatus = module.exports = mongoose.model('TelegramStatus',telegramStatusSchema);