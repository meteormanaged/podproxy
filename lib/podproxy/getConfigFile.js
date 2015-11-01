var jsonfile = require('jsonfile');
var util = require('util');

var getConfigFile = function (location, callback) {
	'use strict';
	var config;
	jsonfile.readFile(location, function (err, obj) {
		if (err) {
			console.log(err);
			return false;
		}
		config = obj.apps;
		callback(config);
	});
	
};

module.exports = getConfigFile;