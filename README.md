# podproxy

Not yet tested at all.  Careful if you pull.

This is a proxy that automatically pulls information from your .podrc configuration file and grabs the names and assigned ports. All requests to the newly spawned proxy server will be forwarded to the appropriate server.

## Usage

	var server = require('podproxy');
	
	var options = {
			host: {
				username: 'admin',
				password: 'admin',
				location: '127.0.0.1',
				port: '19999'
			},
			port: 80, # Port for proxy server
			interval: 20000 # How often to check for updated config.
			static_routes: {
				logs: 8888,
				proxy: 8000 # if you use the gui,
				web: 19999 # pod web services
			}
		};
		
	server(options);
	
Updated November 1, 2015 - Mike Kozak