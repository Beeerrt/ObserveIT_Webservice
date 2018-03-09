var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

//DatenbankSchema definieren

//Userschema anlegen
var telegramUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nachname:{
        type: String,
        required: true
    },
    telegramid:
    {
        type: String,
        required: true
    }
});

//Model für andere Komponenten verfügbar machen
var User = module.exports = mongoose.model('TelegramUser', telegramUserSchema);