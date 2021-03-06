// Dependencies
// -----------------------------------------------------
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var app = express();
app.locals.moment = require('moment');

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/hackernews';
// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect(mongoUri, function(err, res) {
	if(err) throw err;
	console.log('Connected to Database');
});

// Logging and Parsing
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'))); // sets the static files location to public
app.use(morgan('dev')); // log with Morgan
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(express,app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Listen
// -------------------------------------------------------
app.listen(process.env.PORT || 3000, function() { 
	console.log('App listening on port 3000');
});