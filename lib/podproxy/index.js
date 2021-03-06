// Require dependencies
var httpProxy = require('http-proxy'),
	proxy = httpProxy.createProxy(),
	port = process.env.PORT || 80,
	http = require('http');

//Require functionality.
var getConfig = require("./getJson"),
	addStaticRoutes = require("./addStaticRoutes");

//Initial state for config.
var config;

var createServer = function (options) {
	'use strict';
	var interval;
	
//	To Do: Error check all the options.
	getConfig(options, function (results) {
		if (options.hasOwnProperty('static_routes')) {
			config = addStaticRoutes(options.static_routes, results);
		} else {
			config = results;
		}
		console.log(config);
	});
	
	if (options.hasOwnProperty('internal')) {
		interval = options.interval;
	} else {
		interval = 20000;
	}
	
	setInterval(function () {
		getConfig(options, function (results) {
			config = results;
		});
	}, interval);

	http.createServer(function (req, res) {
		var hostname = req.headers.host.substring(0, req.headers.host.indexOf("."));
		if (!config.hasOwnProperty(hostname)) {
			return false;
		}
		console.log(hostname);
		console.dir(config);
		console.log(config[hostname]);
		proxy.web(req, res, {
			target: "http://127.0.0.1:" + config[hostname]
		}, function (e) {
			console.log(e);
		});
	}).listen(port, function () {
		console.log("Listening on " + port);
	});
};

module.exports = createServer;