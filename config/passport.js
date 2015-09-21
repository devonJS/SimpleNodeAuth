var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.model.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallBack: true
    }, function(email, password, done) {
            process.nextTick(function() {
                User.findOne({'local.email': email}, function(err, user){
                    if(err) return done(err);
                    if(user) {
                        return done(null, false, {'message': 'That email is already taken'});
                    }
                    else {

                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password)

                        newUser.save(function(err){
                            if(err) throw err;

                            return done(null, newUser);
                        });
                    }
                });
            });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallBack: true
      }, function(email, password, done) {
          User.findOne({'local.email': email}, function(err, user){
              if(err) return done(err);

              if(!user) {
                  return done(null, false, {'message': "User does not exist"});
              }

              if(!user.validatePassword(password)) {
                  return done(null, false, {'message': "User email or password is incorrect"});
              }

              return done(null, user);
          });
      }
    ));
};
