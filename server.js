var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    config          = require('./config/development'),
    mongoose        = require('mongoose'),
    path            = require('path'),
    passport        = require('passport'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    flash           = require('connect-flash');

require('./config/passport.js')(passport);
app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'insert-secret-here'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use(methodOverride());      // simulate DELETE and PUT

//Database Connection
mongoose.connect(config.mongo.uri);

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT");
    next();
});

//Routing
app.use('/users', require('./routes/users'));


app.use(function(req, res){
  res.send(404);
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
