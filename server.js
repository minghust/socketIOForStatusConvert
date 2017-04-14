//
// Created by Ming Zhang on 04-10-17
//

let server = require('http').createServer();
let socket = require('socket.io').listen(server);
let sleep = require('sleep-promise');
let sleep_ = require('sleep');
server.listen(8080);

// online pool
matchPool = [];

socket.on("connection", function (socket) {
	// events
	// 包括接收客户端连接信号、客户端的状态转移信号、客户端断开连接信号
	// 用户建立与服务器的连接之后即为online状态，会选择matching状态或者offline状态
	// 选择matching状态之后会选择waitting状态或者offline
	// 选择waitting之后会进入chatting状态，
	// chatting完之后会进入继续matching状态

	socket.on('matching', function(data){

		if(Math.random() < 0.3)
		{
			console.log(data.userId, 'disconnect while matching');
			socket.disconnect();
		}
		else 
		{
			matchPool.push(data.userId);
		}
			// console.log('waitting...');// waitting for 10 user to connect to server
		sleep(5000).then(()=>{
			// offline while waitting
			if(Math.random() < 0.3)
			{
				console.log(data.userId, 'disconnect while waitting');
				socket.disconnect();
			}
			else
			{
				while(true)
				{
					let randomIndex_1 = Math.round(Math.random()*(matchPool.length-1));
					let randomIndex_2 = Math.round(Math.random()*(matchPool.length-1));
					if(randomIndex_1 != randomIndex_2)
					{
						sendToVideoServer(matchPool[randomIndex_1], matchPool[randomIndex_2]);
						break;
					}
				}			
			}

		});
		socket.on('rematching', function(data){
			sleep(5000).then(()=>{
				while(true)
				{
					let randomIndex = Math.round(Math.random()*(matchPool.length-1));
					if(randomIndex != matchPool.indexOf(data.userId))
					{
						// console.log('Rechatting');
						__sendToVideoServer(matchPool[randomIndex], data.userId);
						break;
					}
				}
			});
		});
		
		// client request offline
		socket.on('offline', function(data){
			let index = matchPool.indexOf(data.userId);
			matchPool.splice(index);
			console.log(data.userId, ' offline');
			socket.disconnect();
		});

	});
});

// 3rd party video server
function sendToVideoServer(userId_1, userId_2)
{	
	console.log('chatting: ',userId_1, userId_2);
}
function __sendToVideoServer(userId_1, userId_2)
{	
	console.log('Rechatting: ',userId_1, userId_2);
}