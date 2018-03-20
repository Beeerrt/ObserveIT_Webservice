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


//Starten des Telegram Dienstes
//var telegram = require('./component/telegram/telegramRecieve');

//var infounitService = require('./component/infounit/checkInfounit');


//MongoDB Verbindung aufbauen
var mongo = require('./controller/mongoController');

// //MongoDB Connection
// mongoose.connect(config.database);

// //Verbindung zur Datenbank erfolgreich
// mongoose.connection.on('connected', function(){
//   console.log('Connected to database ' + config.database);
// })

// //Verbindung zur Datenbank fehlgeschlagen
// mongoose.connection.on('err', function(err){
//   console.log('Failed to Connect to Database: ' + err);
// })

//Routen anlegen
var users = require('./routes/usersRouter');
var telegram = require('./routes/telegramRouter');
var infounit = require('./routes/infounitRoute');
var filterUnit = require('./routes/infounitFilterRoute');
var limit = require('./routes/limitRoute');

var app = express();
//var error = require('./controller/errorController');

//wird benötigt damit anfragen von anderen URLs angenommen werden
var corsOptions = {
  //welche Origin soll erlaubt werden
  // >*< bedeutet von jeder URL akzeptieren
  origin: '*'
};

app.use(cors(corsOptions));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport Middleware initialisieren und Session erstellen
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));



//Router hinzufügen
app.use('/users', users);
app.use('/infounit',infounit);
app.use('/filterunit',filterUnit);
app.use('/telegram', telegram);
app.use('/limit' , limit);

//Index Route
app.use('/', function(req, res){
  res.send('Invalid URL');
});

  

// // catch 404 and forward to error handler
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
