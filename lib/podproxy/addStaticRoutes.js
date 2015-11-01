var addStaticRoutes = function (static_routes, config) {
	'use strict';
	var updatedConfig = config;
	Object.keys(static_routes).forEach(function (route) {
		updatedConfig[route] = static_routes[route];
	});
	return updatedConfig;
};

module.exports = addStaticRoutes;
