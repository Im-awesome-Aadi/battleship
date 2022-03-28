/**
 * server SOCKET 
 */
//const lobbyModel = require('../model/lobby')
const lobbyDao = require('./lobby-dao');
const server = require('./server');
const event = require('../utils/socket-strings');
const Board = require('../model/Board');
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

    // Clients requests for board
    socket.on('get-board',(data)=>{
        let board = new Board(data.boardSize,userName);
        board.getShipsPosition(data.shipData);
        socket.emit('return-ship',board);
    });
    
    socket.on('attack',(location)=>{
        socket.broadcast.to(lobbyId).emit('defend',location);
    })
    socket.on('retreat',(data)=>{
        socket.broadcast.to(lobbyId).emit('attack-response',{
            response: data.response,
            row_index : data.row_index,
            col_index:data.col_index
        });
    })
    socket.on('player-handshake',()=>{
        socket.broadcast.to(lobbyId).emit('handshake-data',userName);
    });
});