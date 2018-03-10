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

var User = module.exports = mongoose.model('User', UserSchema);

//GetUserByID
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

//GetUserByUsername
module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};

//change Userdate
module.exports.changeUser = function (user, callback) {
    
    
    //User.save(user,callback);
    //user.save(callback);
};

//AddUser
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

//Compare Password
//Vergleicht das gesendete Password mit dem Password aus der Datenbank
module.exports.comparePassword = function (candidatePassword, hash, callback) {

    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;

        callback(null, isMatch);

    });

};