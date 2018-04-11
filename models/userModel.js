var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

//Userschema anlegen
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    isAdmin:
    {
        type: Boolean,
        required: true
    }
    
});

UserSchema.statics = {
    load: function(username, cb){
        this.findOne({username : username}).exec(cb);
    }
    
};

var User = module.exports = mongoose.model('User', UserSchema);

