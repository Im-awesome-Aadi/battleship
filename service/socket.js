
/**
 * server SOCKET 
 */
//const lobbyModel = require('../model/lobby')

const lobbyDao = require('./lobby-dao');
const server = require('./server');
const event = require('../utils/socket-strings');
const Board = require('../model/board');
const shipData = require('../utils/ship-data');

server.io.on(event.CONNECTION, function(socket){
    let userName = '';
    let lobbyId = '';   
    let hostId='' ;
    let turnId = '';
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
        turnId = currentLobby.hostId;
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

    socket.on(event.GAMESTART,(gameSettings)=>{
        socket.broadcast.to(lobbyId).emit('game-started',{
            boardSize:gameSettings.boardSize,
            shipsCount:gameSettings.shipsCount
        })
    });
    // Clients requests for board
    socket.on(event.GETBOARD,(data)=>{
        let board = new Board(parseInt(data.boardSize),userName);
        board.getShipsPosition(shipData.slice(0,parseInt(data.shipsCount)));
        socket.emit(event.RETURN_SHIP,board);
    });
    
    socket.on(event.ATTACK,(location)=>{
        socket.broadcast.to(lobbyId).emit(event.DEFEND,location);
    })
    socket.on(event.RETREAT,(data)=>{
        socket.broadcast.to(lobbyId).emit(event.ATTACK_RESPONSE,{
            response: data.response,
            row_index : data.row_index,
            col_index:data.col_index
        });
    })
    socket.on(event.P_HANDSHAKE,()=>{
        socket.broadcast.to(lobbyId).emit(event.HANDSHAKE_DATA,userName);
    });
});

