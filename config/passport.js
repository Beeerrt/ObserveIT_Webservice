var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var userModel = require('../models/userModel');
var config = require('../config/database');
var userController = require('../controller/userController');

module.exports = function(passport){
    let opts = {};
        //Nicht fromAuthHeader sondern fromAuthHeaderWithScheme. Wurde bezüglich eines Update geändert
        opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken('jwt');
        opts.secretOrKey = config.secret;
        console.log("Passport use ausführen");
       //
        passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
            console.log("User ID: " + jwt_payload.data._id);
            //jwt_payload-data._id enthält die Nutzungsdaten des angefragt Browsers
            userController.getUserById(jwt_payload.data._id, function(err, user){
                //testausgabe der Payload
                console.log(jwt_payload);
                
                if(err){
                    return done(err, false);
                }
                
                if(user){
                    return done(null, user);
                }
                else
                {
                    return done(null,false);
                }
            });

         }));
    
}