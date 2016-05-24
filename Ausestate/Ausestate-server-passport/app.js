var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var morgan = require('morgan');

var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});


var users = require('./routes/users');
var propertyRouter = require('./routes/propertyRouter');
var uploadRouter = require('./routes/uploadRouter');
var emailRouter = require('./routes/emailRouter');
var newsRouter = require('./routes/newsRouter');
var partnersiteRouter = require('./routes/partnersiteRouter');
var devRouter = require('./routes/devRouter');
var agentemailRouter = require('./routes/agentemailRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//get the image static resource
app.use(express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/images/'));
app.use(cors());

//app.all('*', function(req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "X-Requested-With");
//       res.header('Access-Control-Allow-Headers', 'Content-Type');
//       next();
//});



app.use('/users', users);
app.use('/properties', propertyRouter);
app.use('/uploads', uploadRouter);
app.use('/emails',emailRouter);
app.use('/news',newsRouter);
app.use('/partnersite',partnersiteRouter);
app.use('/development',devRouter);
app.use('/agent',agentemailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
  
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;