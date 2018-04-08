var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var UserModel = mongoose.model('User');




//User Registrieren
module.exports.post = async function(req, res){
    //Neues Userobjekt erstellen
  let newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });
  var user = await  UserModel.findOne({"username" : newUser.username});
  //prüfen ob Username schon vorhanden 
 if(user == null)
 {
  //User in der Datenbank anlegen
  addUser(newUser, function(err, user){
    if(err)
    {
      res.json({success: false, msg: 'User anlegen fehlgeschlagen. Bitte versuchen Sie es erneut.'});
    }
    else
    {
      res.json({success: true, msg: 'User angelegt'});
    }
  })
 }
 else{
   res.json({success: false, msg: 'Username ist schon vorhanden'})
 }


}

module.exports.authenticate = async function(req,res){

       //get Username and Password
   var username = req.body.username;
   var password = req.body.password;

  console.log(username);
   //User laden
   getUserByUsername(username, function(err, user){
    if(err) throw err;

    //Prüfen ob User gefunden wurde
    if (!user)
    {
      return res.json({success: false, msg: 'User nicht gefunden.'});
    }

    //Check Password
    comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;

      //Korrektes Password
      if(isMatch)
      {
        //Token erstellen 
        //Hinweis: user.toJSON ist notwendig da die Methode sign ein Objekt erwartet. Der User jedoch ein Mongoose Objekt ist,
        //deshalb wird hier die toJSON methode verwendet
        var token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 Woche
        });

        //Antwort erstellen
        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          }
        });

      }
      else
      {
        //Falsches Password
        return res.json({success: false, msg: 'Falsches Passwort'});

      }
    });


   });


}

module.exports.getProfile = async function(req,res){
    console.log(req);
    getUserByUsername(req.params.username, function(err, user){
        if (err) throw err;
        console.log(user);
        res.send({user:user});
    })

  //  res.send({user: req.user});
}

module.exports.setProfile = async function(req,res){
    //UserModel Erstellen
    let newUser = new UserModel({
        name: req.body[1].name,
        email: req.body[1].email,
        username: req.body[1].username,
        password: req.body[1].password,
        isAdmin: req.body[1].isAdmin
      });
  
      let oldUser = new UserModel({
        name: req.body[0].name,
        email: req.body[0].email,
        username: req.body[0].username,
        password: req.body[0].password,
        isAdmin: req.body[0].isAdmin
      })
      console.log("alter User: "  + oldUser);
      console.log("neuer User: "  + newUser);
  
  
    //user ändern
    changeUser(newUser,oldUser ,function(err,user){
      if(err) {
        console.log(err);
        res.send({success: false, msg: 'Userdaten konnten nicht geändert werden'});
      }
      else{
        res.send({success: true, msg: 'Userdaten erfolgreich geändert'});
      }
    })
}

//GetUserByID
module.exports.getUserById = getUserById; 

function getUserById (id, callback) {
    UserModel.findById(id, callback);
};

//GetUserByUsername
function getUserByUsername (username, callback) {
    var query = { username: username };
    UserModel.findOne(query, callback);
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
    UserModel.updateOne(query, values,callback);

};
//module.exports.changeUser = changeUser;

// //AddUser
// module.exports.addUser = addUser;

async function addUser(newUser, callback) {
    var hash = await hashPassword(newUser.password);
    newUser.password = hash;
    newUser.save(callback);
};

//Compare Password
//Vergleicht das gesendete Password mit dem Password aus der Datenbank
//module.exports.comparePassword = comparePassword;

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