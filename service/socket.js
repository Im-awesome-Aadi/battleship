const dbService = require('../service/db');
const Server = require('./server');
Server.io.on('connection', function(socket){
    let userName = "";
    let lobbyId = "";
    console.log("server "+socket.id);
    
    socket.emit('welcome') // Server sent this to the connected client
    socket.on('pass-user-data',(clientData)=>{
        console.log('client sent me data')
        console.log(clientData);
        userName = clientData.userName;
        lobbyId = clientData.lobbyId;
        
    })
    socket.on('join-room',async()=>{
        console.log("user trying to join room");
        console.log(`${userName} joined ${lobbyId}`);
        socket.join(lobbyId);
        
        let currentLobby = await dbService.getCurrentLobby(lobbyId);
        
        if(currentLobby){
            currentLobby.players.push(userName);
            currentLobby.save();
        }
        socket.emit('joined',currentLobby);
        
        
        socket.broadcast.to(lobbyId).emit('user-added',currentLobby);
    });
  
    socket.on('disconnect', async()=>{
        
        
        let currentLobby = await dbService.getCurrentLobby(lobbyId);

        let playerIndex=0;
        if(currentLobby){
            for(let i=0;i<currentLobby.players.length;i++){
                if(currentLobby.players[i]== userName){
                    playerIndex=i;
                    break;
                }
            }
            currentLobby.players.splice(playerIndex,1);
            currentLobby.save();
            socket.broadcast.to(lobbyId).emit('player-left',currentLobby);
        }

        console.log(`${userName} disconnected from ${lobbyId}`);
    });

});