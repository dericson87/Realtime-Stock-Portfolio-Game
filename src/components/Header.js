import React from 'react';
import { Link } from 'react-router-dom';
import User from '../User';
import axios from 'axios';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: '561311346728-12kk21om7rjfksssh4qg9qi27qu568kp.apps.googleusercontent.com',
    clientSecret: 'RaSICxnN0JwM9XYc7Oli0_Z2',
    callbackURL: "http://stocktracka.herokuapp.com"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         console.log('finduserorcreate');
         return done(err, user);
       });
  }
));

function onclick(event) {
  console.log('onclick');
  axios.get(`/api`).then((res)=>console.log('got from express: ' + res));

  passport.authenticate('google', { failureRedirect: '/failure' },
  function(req, res) {
    console.log("logged in");
    res.redirect('/');
  });
}
const Header = props => {
  return (
    <header>
      <Link to='/'>
        <h1>Stock Search</h1>
      </Link>
      {/* <Link to='/login'>
        <h2>Login</h2>
      </Link> */}
      <button onClick={onclick}>Login</button>
      <Link to='/'>
        <h2>Register</h2>
      </Link>
   </header>
  )
}


export default Header