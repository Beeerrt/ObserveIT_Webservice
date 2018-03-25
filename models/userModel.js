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


async function changeUser(newUser, oldUser, callback) {
    //check ob passwort sich geändert hat 
    if(newUser.password == oldUser.password){
        //passwort ist identisch

    }
    else{
        //Passwort hat sich geändert
        //Password muss neu gehasht werden
        console.log("klartext Password:"+ newUser.password )
        newUser.password =  await hashPassword(newUser.password);
        console.log("password gehasht : " + newUser.password);

 
    }
    
    console.log("alter name: " +  oldUser.name);
    console.log(newUser);
    //User Update
    var query = { name: oldUser.name };
    var values = { $set: {name: newUser.name, 
                            username:newUser.username, 
                            email:newUser.email,
                            password:newUser.password,
                            isAdmin: newUser.isAdmin } };
    User.updateOne(query, values,callback);

};
module.exports.changeUser = changeUser;

//AddUser
module.exports.addUser = addUser;

async function addUser(newUser, callback) {
    var hash = await hashPassword(newUser.password);
    newUser.password = hash;
    newUser.save(callback);
};

//Compare Password
//Vergleicht das gesendete Password mit dem Password aus der Datenbank
module.exports.comparePassword = comparePassword;

async function comparePassword(candidatePassword, hash, callback) {
    var isMatch = await bcrypt.compare(candidatePassword, hash);
    callback(null,isMatch);
};

async function hashPassword(password)
{
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password,salt)
    return hash;
}