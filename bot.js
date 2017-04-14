//
// Created by Ming Zhang on 04-10-17
//

let socket = require('socket.io-client')('http://localhost:8080');
let userId = Math.round(Math.random()*10000);

// online->matching->waitting->chatting->offline or rematch


// for (let i = 2; i >= 0; i--) {

// 	socket.emit('matching', {userId: userId});
// 	if(Math.random() < 0.5)
// 	{
// 		socket.emit('rematching', {userId: userId});
// 	}
// 	else
// 	{
// 		socket.emit('offline', {userId: userId});
// 		socket.disconnect();
// 	}
// }
// socket.on("disconnect", function () {
// 	console.log("服务器端断开连接.");
// });


socket.emit('matching', {userId: userId});
if(Math.random() < 0.5)
{
	socket.emit('rematching', {userId: userId});
}
else
{
	socket.emit('offline', {userId: userId});
	socket.disconnect();
}
socket.on("disconnect", function () {
	console.log("服务器端断开连接.");
});