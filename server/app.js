var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var bodyParser = require("body-parser");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// Loggin code
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("../build"));

// Express will serve up the front-end index.html file if it doesn't recognize the route
// app.get("/dashboard", (req, res) =>
//   res.sendFile(path.resolve("../build", "index.html"))
// );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

//app.use('/api', (req, res) => res.send('hello from api'));
// User data
var users = {
  "Derek": ['AAPL', 'TSLA', null],
  "Ricardo": {cash: 0, holdings: [{ ticker: 'TSLA', units: 100}, {ticket:'AAPL', units:10}]},
  "Monica": {cash: 100000, holdings: []},
  "rramosrosales@gmail.com": {name:"Ricardo Ramos", stocks:[]}
};

app.use('/api/users', (req, res)=>{
  console.log('>> in /api/users');
  console.log(req);
  res.send( users);
});
app.use('/api/set-stocks', (req, res)=>{
  console.log(req);
  users[req.body.user] = req.body.stocks;
  res.send('OK');
});

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ');
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser: ');
  console.log(user);
  done(null, { ricardo: 'hello'});
});

passport.use(new GoogleStrategy({
    clientID: '561311346728-12kk21om7rjfksssh4qg9qi27qu568kp.apps.googleusercontent.com',
    clientSecret: 'RaSICxnN0JwM9XYc7Oli0_Z2',
    callbackURL: "http://localhost:3001/loggedin"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("After login");
      console.log(profile);
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    console.log('finduserorcreate');
      //    return done(err, user);
      //  });
      return done(null, profile);
  }
));
app.get('/loggedin',
	passport.authenticate( 'google', {
		successRedirect: 'http://localhost:3001/dashboardx',
		failureRedirect: '/login'
  })
);
app.get('/login', 
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
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
