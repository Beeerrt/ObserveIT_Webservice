var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require(__base + 'config/database');

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
module.exports.changeUser = function (newUser, oldUser, callback) {
    //check ob passwort sich geändert hat 
    if(newUser.password == oldUser.password){
        //passwort ist identisch
        console.log("Passwort identisch")   
    }
    else{
        //Passwort hat sich geändert
        //Password muss neu gehasht werden
        console.log("Passwort nicht identisch");
    }
    
    console.log("alter name: " +  oldUser.name);
    console.log(newUser);
    //User Update

    //User.updateOne({"name" : olderUser.name}, {$ser :{"isAdmin": false});
    // User.updateOne({"name" : oldUser.name},{$set : {"name" : newUser.name,   
    //                                                     "username": newUser.username,
    //                                                     "password": newUser.password,
    //                                                     "isAdmin": newUser.isAdmin,
    //                                                     "email": newUser.email}}
    //                                                 );
     callback();
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