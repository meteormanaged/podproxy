var server = require('./lib');

var options = {
	username: 'admin',
	password: 'admin',
	location: '127.0.0.1',
	port: '19999'
};

server(options);