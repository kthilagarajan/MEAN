/*******************************
 * Import Required Modules
 ****************************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path")
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var MongoAdapter = require('./modules/mongo-adapter')

/*******************************
 * Require Configuration
 ****************************/
var conf = require('./conf');

/*******************************
 * MongoDB Initializaion
 ****************************/

// app.use(bodyParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
/*
//For Static Files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/webapps'));
app.use(layout());*/

/* app.use('/', express.static(__dirname + "/views"));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
}); */


app.use(cookieParser());
app.use(session({secret: "openjwtkey"}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./modules/passport')(passport,app);

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,content-type,__setXHR_');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = require('http').Server(app);
var MongoDB = new MongoAdapter(conf)
MongoDB.connect(function(db) {
    server.listen(conf['web']['port'], function() {
        console.log('API running on localhost:' + conf['web']['port'])
    });
    app.db = db;
    app.conf = conf;
    //Initializing the web routes
    var Tasks = require('./routes/task/task-routes');
    new Tasks(app);
    var Users = require('./routes/user/user-routes');
    new Users(app);
});