const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models');

module.exports = (app) => {

  app.use(cookieparser());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // automatically extends the session age on each request. useful if you want
    // the user's activity to extend their session. If you want an absolute session
    // expiration, set to false
    rolling: true,
    name: 'sid', // don't use the default session cookie name
    // set your options for the session cookie
    cookie: {
      httpOnly: true,
      // the duration in milliseconds that the cookie is valid
      maxAge: 20 * 60 * 1000, // 20 minutes
      // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
      // domain: 'your.domain.com',
      // recommended you use this setting in production if your site is published using HTTPS
      // secure: true,
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(function (userId, done) {
    db.User.findById(userId)
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });

  passport.use(new LocalStrategy((username, password, done) => {
      db.User.findOne({
        username: username
      }).then(function(dbUser){
        if(!dbUser) {
          return done(null, false, "user");
        }
        else
          return dbUser.validatePassword(password).then(isMatch => done(null, isMatch ? true : false, isMatch ? null : "password"));
      }).catch(done);
    }
  ));

  app.use(passport.initialize());

  app.use(passport.session());
}
