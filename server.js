// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	// console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var client = 0;



var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {

			client = socket.id;
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		

		socket.on('orientation', function(data){
			// console.log('gamma: ' + data.gamma);
			if(client == socket.id){
				socket.broadcast.emit('orientation', data);
			}
		});

		//listen for touch event - this comes from mobile
		socket.on('touchCircle', function(data){
			// console.log('mobile circle touched!')

			//replay the event to the desktop client
			socket.broadcast.emit('touchCircle', data);

		});
		socket.on('eraseRinglet', function(data){
			socket.broadcast.emit('eraseRinglet', data);
		});

	

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	});