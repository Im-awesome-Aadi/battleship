/**
 * server SOCKET 
 */
//const lobbyModel = require('../model/lobby')
const lobbyDao = require('./lobby-dao');
const server = require('./server');
const event = require('../utils/socket-strings');
server.io.on(event.CONNECTION, function(socket){
    let userName = '';
    let lobbyId = '';    
    socket.emit(event.WELCOME) // server sent this to the connected client

    // Saving the clientdata received from frontend(user)
    socket.on(event.PASSUSERDATA,(clientData)=>{
        userName = clientData.userName;
        lobbyId = clientData.lobbyId;
        
    });

    // Client connects to the lobby
    socket.on(event.JOINLOBBY,async()=>{
        socket.join(lobbyId);
        let currentLobby = await lobbyDao.addPlayer(lobbyId,userName,socket.id);
        socket.emit(event.JOINED,currentLobby);
        socket.broadcast.to(lobbyId).emit(event.PLAYERADDED,currentLobby,userName);
    });

    socket.on(event.SENDCHAT,(chat)=>{
            socket.broadcast.to(lobbyId).emit(event.RECDCHAT,chat);
    });
  
    //Client disconnects from lobby
    socket.on(event.DISCONNECT, async()=>{
        let currentLobby = await lobbyDao.removePlayer(lobbyId,socket.id);
        if(currentLobby){
            socket.broadcast.to(lobbyId).emit(event.PLAYERLEFT,currentLobby,userName);
        }
    });

});