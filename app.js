
/**
 * Module dependencies.
 */

var	express = require('express')
	routes = require('./routes'),
	less = require('less'),
	path = require('path'),
	fs = require('fs'),
	sys = require('util');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Build (Stylesheets)
var lessBootstrapFile = path.join(__dirname, 'style/bootstrap.less');
var cssBootstrapFile = path.join(__dirname, 'public/css/bootstrap.css');
var parseBootstrapLess = function(){
	var lessParser = new(less.Parser)({
	    paths: ['.', './style'], // Specify search paths for @import directives
	});
	
	fs.readFile(lessBootstrapFile, 'utf8', function (e, data) {
		lessParser.parse(data, function (e, tree) {
		    //tree.toCSS({ compress: true }); // Minify CSS output
		    fs.writeFile(cssBootstrapFile, tree.toCSS(), function (err) {
				if (err) throw err;
				console.log(cssBootstrapFile + ' Written to disk!');
			});
		});
	});
};

var lessGPFile = path.join(__dirname, 'style/g-p.less');
var cssGPFile = path.join(__dirname, 'public/css/css.css');
var parseGPLess = function(){
	var lessParser = new(less.Parser)({
	    paths: ['.', './style'], // Specify search paths for @import directives
	});
	
	fs.readFile(lessGPFile, 'utf8', function (e, data) {
		lessParser.parse(data, function (e, tree) {
		    //tree.toCSS({ compress: true }); // Minify CSS output
		    fs.writeFile(cssGPFile, tree.toCSS(), function (err) {
				if (err) throw err;
				console.log(cssGPFile + ' Written to disk!');
			});
		});
	});
};

//parseBootstrapLess();
//parseGPLess();

fs.watchFile(path.join(__dirname, 'style/variables.less'), parseBootstrapLess);
fs.watchFile(lessGPFile, parseGPLess);

// Routes
app.get('/', routes.index);

app.listen(3030);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
