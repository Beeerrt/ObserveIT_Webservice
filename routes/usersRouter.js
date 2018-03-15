var express = require('express');
var router = express.Router();
var UserModel = require(__base +'models/userModel');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var usercontroller = require('../controller/userController');


//Register
router.post('/register',function(req,res,next){ 
  //Neues Userobjekt erstellen
  let newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  //User in der Datenbank anlegen
  UserModel.addUser(newUser, function(err, user){
    if(err)
    {
      res.json({success: false, msg: 'Failed to register User'});
    }
    else
    {
      res.json({success: true, msg: 'User registered'});
    }
  })
  
});

// #region Routing

//Authentication
router.post('/authenticate', function(req, res, next){
   //get Username and Password
   var username = req.body.username;
   var password = req.body.password;

    console.log(username + " und " + password);
   //User laden
   UserModel.getUserByUsername(username, function(err, user){
    if(err) throw err;

    //Prüfen ob User gefunden wurde
    if (!user)
    {
      return res.json({success: false, msg: 'User not found'});
    }

    //Check Password
    UserModel.comparePassword(password, user.password, function(err, isMatch){
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
          token: 'JWT ' + token,
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
        return res.json({success: false, msg: 'Wrong Password'});

      }
    });


   });



});

//Passwordcheck
router.post('/checkpassword',passport.authenticate('jwt', {session: false}),function(req, res, next){
  
  //check if old password equals the new one
  
  res.send({success: false, msg: 'Wrong Password'});
  });

//set Profile
// router.post('/profile', passport.authenticate('jwt', {session: false}),function(req, res, next){
  
  
//   res.send({user: req.user});
//   });

//get Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),function(req, res, next){
  console.log(req.user);
  res.send({user: req.user});
  });

 // router.get('/profile', passport.authenticate('jwt', {session: false}),usercontroller.get);
  
 router.put('/profile', function(req, res, next){
  //var oldUser = req.body.users[0];
  //var newUser = req.body.users[1];
  

  //UserModel Erstellen
    let newUser = new UserModel({
      name: req.body.users[1].name,
      email: req.body.users[1].email,
      username: req.body.users[1].username,
      password: req.body.users[1].password,
      isAdmin: req.body.users[1].isAdmin
    });

    let oldUser = new UserModel({
      name: req.body.users[0].name,
      email: req.body.users[0].email,
      username: req.body.users[0].username,
      password: req.body.users[0].password,
      isAdmin: req.body.users[0].isAdmin
    })
    

  //user ändern
  UserModel.changeUser(newUser,oldUser ,function(err,user){
    if(err) throw err;
    res.send(newUser);
  })
 });


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// #endregion

module.exports = router;


//Um eine Route vor ungewünschten Zugriffen zu sichern wird in der Route 
// passport.authenticate('jwt', {session: false}) als parameter mitübergeben
//Dies Überprüft das Token, welches in der Payload steht.