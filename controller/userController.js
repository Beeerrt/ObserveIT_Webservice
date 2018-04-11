var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var UserModel = mongoose.model('User');

/**
 * Löscht User anhand des Usernamen
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteUser = async function (req,res){
  var username = req.params.username;

  UserModel.load(username, function(err, user)
    {
        user.remove(function(err){
            if(err){
                res.send({success: false, msg: 'User konnte nicht gelöscht werden'});
               }
               else{
                res.send({success: true, msg: 'User erfolgreich gelöscht'});
               }
        })    
    });
}

/**
 * Liefert alle User zurück
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getUsers = async function getUsers(req, res) {
  var users = await UserModel.find({});
  res.send(users);
}

/**
 * User registirieren
 * @param {*} req 
 * @param {*} res 
 */
module.exports.post = async function(req, res) {
  //Neues Userobjekt erstellen
  let newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });
  var user = await UserModel.findOne({ "username": newUser.username });
  //prüfen ob Username schon vorhanden 
  if (user == null) {
    //User in der Datenbank anlegen
    addUser(newUser, function (err, user) {
      if (err) {
        res.json({ success: false, msg: 'User anlegen fehlgeschlagen. Bitte versuchen Sie es erneut.' });
      }
      else {
        res.json({ success: true, msg: 'User angelegt' });
      }
    })
  }
  else {
    res.json({ success: false, msg: 'Username ist schon vorhanden' })
  }


}
/**
 * Authentifiziert den übergebenen User, falls der Username und das Passwort korrekt sind
 * @param {req} req 
 * @param {*} res 
 */
module.exports.authenticate = async function (req, res) {

  //get Username and Password
  var username = req.body.username;
  var password = req.body.password;

  //User laden
  getUserByUsername(username, function (err, user) {
    if (err) throw err;

    //Prüfen ob User gefunden wurde
    if (!user) {
      return res.json({ success: false, msg: 'User nicht gefunden.' });
    }

    //Prüfen ob Klartextpasswort mit DB User Passwort übereinstimmt
    comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;

      //Korrektes Password
      if (isMatch) {
        //Token erstellen 
        var token = jwt.sign({ data: user }, config.secret, {
          //Time to Live
          //1800 = 30 minuten
          expiresIn: 1800 
        });

        //Antwort generieren
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
      else {
        //Falsches Password
        res.json({ success: false, msg: 'Falsches Passwort' });

      }
    });


  });


}
/**
 * Liefert bestimmten User aus der Datebank zurück 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getProfile = async function (req, res) {
  getUserByUsername(req.params.username, function (err, user) {
    if (err) throw err;
    res.send({ user: user });
  })
}
/**
 * Ersetzt Userdaten in der Datebank des oldUsers mit denen des newUsers
 * @param {*} req 
 * @param {*} res 
 */
module.exports.setProfile = async function (req, res) {
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

  //prüfen ob Username schon vorhanden
  var user = await UserModel.findOne({ "username": newUser.username });

  if (user == null) {
    //user ändern
    changeUser(newUser, oldUser, function (err, user) {
      if (err) {
        res.send({ success: false, msg: 'Userdaten konnten nicht geändert werden' });
      }
      else {
        res.send({ success: true, msg: 'Userdaten erfolgreich geändert' });
      }
    })
  }
  else {
    if (oldUser.username == newUser.username) {
      //user ändern
      changeUser(newUser, oldUser, function (err, user) {
        if (err) {
          res.send({ success: false, msg: 'Userdaten konnten nicht geändert werden' });
        }
        else {
          res.send({ success: true, msg: 'Userdaten erfolgreich geändert' });
        }
      })
    }
    else {
      res.send({ success: false, msg: 'Username schon vorhanden' });
    }

  }

}

/**
 * Lädt anhand der id den User aus der Datenbank
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.getUserById = function getUserById(id, callback) {
  UserModel.findById(id, callback);
};

/**
 * Lädt anhand des Usernamen den User aus der Datenbank
 * @param {*} username 
 * @param {*} callback 
 */
function getUserByUsername(username, callback) {
  var query = { username: username };
  UserModel.findOne(query, callback);
};



/**
 * Ändert innerhalb der Datenbank Userdaten des oldUser in Userdaten des newUser
 * @param {*} newUser 
 * @param {*} oldUser 
 * @param {*} callback 
 */
async function changeUser(newUser, oldUser, callback) {
  //check ob passwort sich geändert hat 
  if (newUser.password == oldUser.password) {
    //passwort ist identisch
  }
  else {
    //Passwort hat sich geändert
    //Password muss neu gehasht werden
    newUser.password = await hashPassword(newUser.password);
  }


  //User Update
  var query = { name: oldUser.name };
  var values = {
    $set: {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin
    }
  };
  UserModel.updateOne(query, values, callback);

};


/**
 * Fügt übergebenen User der Datenbank hinzu
 * @param {*} newUser 
 * @param {*} callback 
 */
async function addUser(newUser, callback) {
  var hash = await hashPassword(newUser.password);
  newUser.password = hash;
  newUser.save(callback);
};


/**
 * Überprüft ob Passwörter übereinstimmen
 * @param {*} candidatePassword 
 * @param {*} hash 
 * @param {*} callback 
 */
async function comparePassword(candidatePassword, hash, callback) {
  var isMatch = await bcrypt.compare(candidatePassword, hash);
  callback(null, isMatch);
};

/**
 * Hasht das übergebene Passwort
 * @param {*} password 
 */
async function hashPassword(password) {
  //generieren eines Salts 
  var salt = await bcrypt.genSalt(10);
  //Klartextpasswort mit Salt hashen
  var hash = await bcrypt.hash(password, salt)
  return hash;
}