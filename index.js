var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require("body-parser");
var path = require('path');
var fs = require('fs');
var users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/welcome.html');
});

app.post('/user', function (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

var room = io.of('/chatRoom');

room.on('connection', function (socket) {

	socket.on('handshake', function(data){
		console.log('a new user connected -- '+ data.user);
		users.push({
			name: data.user
		});
		var resp = { 
			data: 'a new user connected, welcome '+ data.user , 
			counter: users.length
		};
		socket.broadcast.emit('userAct', resp);
	});

	socket.on('disconnect', function(data){
		console.log('a user disconnect');
		socket.broadcast.emit('userAct', { data: 'a user disconnect', counter: users.length});
	});

	socket.on('stream', function(data){
		console.log('stream connect');
		socket.broadcast.emit('stream', data);
	});

  	socket.on('message', function (data) {
  		console.log('message recieved');
  		socket.broadcast.emit('msg', { username: data.name, msg: data.msg});
  	});
});