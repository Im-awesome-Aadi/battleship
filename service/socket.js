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
        
        socket.join(lobbyId);
        
        let currentLobby = await dbService.getCurrentLobby(lobbyId);
        
        if(currentLobby){
            currentLobby.players.push(userName);
            currentLobby.save();
        }
        socket.emit('joined',currentLobby);
        
        
        socket.broadcast.to(lobbyId).emit('user-added',currentLobby,userName);
    });

    socket.on('send-msg',(data)=>{
            console.log('received msg from client');
            console.log(data);
            socket.broadcast.to(lobbyId).emit('recd-msg',data);
    });
  
    socket.on('disconnect', async()=>{
        
        
        let currentLobby = await dbService.getCurrentLobby(lobbyId);
        let currentHost = currentLobby.hostName;
        console.log(currentHost);
        console.log(currentLobby);
        let playerIndex=0;
        if(currentLobby){
            for(let i=0;i<currentLobby.players.length;i++){
                if(currentLobby.players[i]== userName){
                    playerIndex=i;
                    break;
                }
            }
 
            currentLobby.players.splice(playerIndex,1);
            if(currentHost == userName){
                currentLobby.hostName = currentLobby.players[0];
            }
            console.log(currentLobby);
            currentLobby.save();
            socket.broadcast.to(lobbyId).emit('player-left',currentLobby,userName);
        }

        console.log(`${userName} disconnected from ${lobbyId}`);
    });

});