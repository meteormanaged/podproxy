var needle = require('needle');

var parseResponse = function (response) {
	'use strict';
	var config = {};
	response.forEach(function (item) {
		config[item.name] = item.port;
	});
	return config;
};

var getJson = function (options, callback) {
	'use strict';

	var target = "http://" + options.username + ":" + options.password + "@" + options.location + ":" + options.port + "/json";
	needle.get(target, function (error, response) {
		console.log(target);
		if (!error && response.statusCode == 200) {
			callback(parseResponse(response.body));
		} else {
			callback(error);
		}
	});
};

module.exports = getJson;
