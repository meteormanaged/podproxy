# podproxy

Not yet tested at all.  Careful if you pull.

This is a proxy that automatically pulls information from your .podrc configuration file and grabs the names and assigned ports. All requests to the newly spawned proxy server will be forwarded to the appropriate server.

## Usage

	var podproxy = require('podproxy');
	
	var options = {
		port: 80,
		static_routes: {
			logs: 8888,
			proxy: 8000
		},
		config_location: '/home/user/.podrc'
	};
	
	podproxy(options);
	
Updated November 1, 2015 - Mike Kozak