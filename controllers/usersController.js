var User = require('../models/users.model');
var passport = require('passport');

function parseQueryString(query){
  var q = {
    userName: query.username,
    password: query.password,
    email: query.email
  }
}

exports.login = function(req, res, next) {
    passport.authenticate('local-login', function(err, user, msg){
        if(err) res.json(err)
        else if(msg) res.json(msg)
        else {
          res.json(user);
        }
    })(req, res, next);
};

exports.signUp = function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, msg){
        if(err) res.json(err)
        else if(msg) res.json(msg)
        else {
          res.json(user);
          User.findByIdAndUpdate(user._id, {'local.username': req.body.username}, function(err, result){
            if(err) return err
            else console.log("Success! Added " + req.body.username + " to " + result.local.email);
          });
        }
    })(req, res, next);
};
