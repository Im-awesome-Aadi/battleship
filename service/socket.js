/**
 * SERVER SOCKET 
 */
const lobbyModel = require('../model/lobby')
const Server = require('./server');
Server.io.on('connection', function(socket){
    let userName = "";
    let lobbyId = "";
    console.log("server "+socket.id);
    
    socket.emit('welcome') // Server sent this to the connected client

    // Saving the clientdata received from frontend(user)
    socket.on('pass-user-data',(clientData)=>{
        console.log('client sent me data')
        console.log(clientData);
        userName = clientData.userName;
        lobbyId = clientData.lobbyId;
        
    });

    // Client connects to the lobby
    socket.on('join-lobby',async()=>{
        
        socket.join(lobbyId);
        let currentLobby = await lobbyModel.addPlayer(lobbyId,userName);
        socket.emit('joined',currentLobby);
        socket.broadcast.to(lobbyId).emit('user-added',currentLobby,userName);
    });

    socket.on('send-msg',(data)=>{
            console.log('received msg from client');
            console.log(data);
            socket.broadcast.to(lobbyId).emit('recd-msg',data);
    });
  
    //Client disconnects from lobby
    socket.on('disconnect', async()=>{
        let currentLobby = await lobbyModel.removePlayer(lobbyId,userName);
        if(currentLobby){
            socket.broadcast.to(lobbyId).emit('player-left',currentLobby,userName);
        }
        console.log(`${userName} disconnected from ${lobbyId}`);
    });

});