var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/config.js');
var connectmongo = require('connect-mongo')(session);

//deliver static files
app.set('views', path.join(__dirname, 'views'));
//set templating engine to hogan
app.engine('html', require('hogan-express'));
//set templates to use html
app.set('view engine', 'html');
//serve static html files
app.use(express.static(path.join(__dirname, 'public')));
//use cookie parser
app.use(cookieParser());
//set session
//app.use(session({secret: 'catscanfly', saveUninitialized: true, resave: true}));
//set mode specific options
process.env.NODE_ENV = 'production';
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  //dev specific settings
  app.use(session ({secret: config.sessionSecret}));
} else {
  //production specific settings
  app.use(session ({
    secret: config.sessionSecret,
    store: new connectmongo({
      url: config.dbURL,
      stringify: true
    })
  }));
}

//use routes in routes.js
require('./routes/routes.js')(express, app);

//launch server and print to console
app.listen(3000, function(){
  console.log('It\'s working!');
  console.log('Mode: ' + env);
});
