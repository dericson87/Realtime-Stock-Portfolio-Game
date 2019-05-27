var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', (req, res) => res.send('hello from api'));

// Loggin code
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: '561311346728-12kk21om7rjfksssh4qg9qi27qu568kp.apps.googleusercontent.com',
    clientSecret: 'RaSICxnN0JwM9XYc7Oli0_Z2',
    callbackURL: "http://localhost:3001/logedin"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         console.log('finduserorcreate');
         return done(err, user);
       });
  }
));
app.use('logedin',(req, res) => {
  console.log(req);
  app.redirect('/');
});
app.get('/login', 
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login',
    failureRedirect: '/stock/TLSA' 
  },
  (args) => {
    console.log('signed in: ' + args);
  }),
  function(req, res) {
    console.log('google login succesful');
    res.redirect('/');
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
