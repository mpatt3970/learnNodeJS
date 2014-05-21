var http = require('http'),
	socket = require('socket.io'),
	path = require('path'),
	fs = require('fs');

var fileName = "./socketio_page.html"

var server = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-type': 'text/html'});
	res.end(fs.readFileSync(fileName));
}).listen(8080);

socket.listen(server).on('connection', function(socket) {
	socket.on('message', function(msg) {
		console.log("Message received: " + msg);
		socket.broadcast.emit("message", msg);
	});
});