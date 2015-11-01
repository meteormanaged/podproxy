// Require dependencies
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxy();
var port = process.env.PORT || 80;
var http = require('http');

//Require functionality.
var getConfigFile = require("./getConfigFile");
var addStaticRoutes = require("./addStaticRoutes");

//Initial state for config.
var config;

var createServer = function (options) {
	'use strict';
	//To Do: Error check all the options.
	if (!options.hasOwnProperty('config_location')) {
		console.log("No configuration file location information provided.");
		return false;
	}
	getConfigFile(options.config_location, function (results) {
		if (options.hasOwnProperty('static_routes')) {
			config = addStaticRoutes(options.static_routes, results);
		} else {
			config = results;
		}
	});

	setInterval(function () {
		getConfigFile(options.config_location, function (results) {
			config = results;
		});
	}, 20000);

	http.createServer(function (req, res) {
		var hostname = req.headers.host.substring(0, req.headers.host.indexOf("."));
		if (!config.hasOwnProperty(hostname)) {
			return false;
		}
		proxy.web(req, res, {
			target: "127.0.0.1" + config[hostname].port
		}, function (e) {
			console.log(e);
		});
	}).listen(port, function () {
		console.log("Listening on " + port);
	});
};
