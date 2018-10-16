var http = require('http');
var url = require('url');
var fs = require('fs');
var httpRequest = require('request');

var server = http.createServer(function( request, response) {
	var path = url.parse(request.url).pathname;
	switch(path) {
		case '/':
			fs.readFile(__dirname + '/index.html', function( error, data ) {
				if (error) {
					response.writeHead(404);
					response.write('Error - page not found');
					response.end();
				} else {
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write(data, 'utf8');
					response.end();
				}
			});
			break;
		default:
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('Error - page not found');
			response.end();
	}
});

server.listen(8000);

// socket.io stuff
var io = require('socket.io').listen(server);

var priceURL = 'https://blockchain.info/ticker';
var price = 0;

io.on('connection', function(socket) {
	console.log('Client connected');

	setInterval(function() {
		httpRequest(priceURL, function(error, response, body) {
			try {
				price=JSON.parse(body).GBP.buy;
			} catch(e) {
				console.log('Couldnt get price from API');
			}
		});
		console.log('Emnitting update \(' + price + '\).');
		socket.emit('stream', {'price': price});
	}, 1000);
});

