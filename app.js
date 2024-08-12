var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 //path.join(__dirname, 'index.html'): This creates an absolute path to index.html based on the directory where your script (app.js) is located (__dirname refers to the directory name of the current module)
 app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
 });
//  var clients = 0;
//  io.on('connection', function(socket){
//     clients++;
//     socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//     socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//     socket.on('disconnect', function () {
//        clients--;
//        socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//     });
//  });
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//    console.log('someone connected');
//    nsp.emit('hi', 'Hello everyone!');
// });
// var roomno = 1;
// io.on('connection', function(socket){
//    socket.join("room-"+roomno);
//    //Send this event to everyone in the room.
//    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// })
users = [];
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUsername', function(data){
       console.log(data);
       if(users.indexOf(data) > -1){
          socket.emit('userExists', data + ' username is taken! Try some other username.');
       } else {
          users.push(data);
          socket.emit('userSet', {username: data});
       }
    });
    socket.on('msg', function(data){
       //Send message to everyone
       io.sockets.emit('newmsg', data);
    })
 });
http.listen(3000, function(){
   console.log('listening on *:3000');
});