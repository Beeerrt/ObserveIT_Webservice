var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');


//MongoDB Verbindung aufbauen
var mongo = require('./controller/mongoController');


//Routen Controller laden
var users = require('./routes/usersRouter');
var telegram = require('./routes/telegramRouter');
var infounit = require('./routes/infounitRoute');
var filterUnit = require('./routes/infounitFilterRoute');
var limit = require('./routes/limitRoute');

//Verwendung der Express Middleware
var app = express();


//wird benötigt damit anfragen von anderen URLs angenommen werden
var corsOptions = {
  //welche Origin soll erlaubt werden
  // >*< bedeutet von jeder URL akzeptieren
  origin: '*'
};

app.use(cors(corsOptions));

app.use(logger('dev'));

//Umwandeln der Requests 
//bodyParser.json Middleware wird nur verwendet bei Requests mit dem Content-Type : Json
//liefert Body Objekt zurück
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport Middleware initialisieren
app.use(passport.initialize());


//app.use(passport.session());

//Tokenverfahren laden 
require('./config/passport')(passport);

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));



//Routen hinzufügen
app.use('/users', users);
app.use('/infounit',infounit);
app.use('/filterunit',filterUnit);
app.use('/telegram', telegram);
app.use('/limit' , limit);

//Index Route
app.use('/', function(req, res){
  res.send('Invalid URL');
});

  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
