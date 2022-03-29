const lobbyModel = require('../model/lobby');

async function createLobby(lobbyId,hostId){
    try{
        const newLobby = new lobbyModel({lobbyId ,hostId,players : []});
        return await newLobby.save();
    }catch(e){
        console.log(e);
        console.log('db error while creating lobby');
    }
}

async function getCurrentLobby(cmpLobbyId){
    try{
        const result = await lobbyModel.find();
        for(let i=0;i<result.length;i++){
            if(result[i].lobbyId == cmpLobbyId){
                return result[i];
            }
            
        }
        return false;    
    }catch(err){
        console.log('db error while finding lobby');
    }
}

async function addPlayer(cmpLobbyId, userName,userId){
    try{
        const currentLobby = await getCurrentLobby(cmpLobbyId);
        if(currentLobby){
            if(currentLobby.hostId == ''){
                currentLobby.hostId = userId;
            }
            currentLobby.players.push({userName,userId});
            currentLobby.save();
        }
        return currentLobby;
    }catch(e){
        console.log('db error while adding a player');
    }
}

async function removePlayer(cmpLobbyId, userId){

    try{
        const currentLobby = await getCurrentLobby(cmpLobbyId);
        const currentHostId = currentLobby.hostId;
        const totalPlayers = currentLobby.players.length;
        if(totalPlayers == 1){
            await deleteLobby(cmpLobbyId);
            return false;
        }
        let playerIndex=0;
        if(currentLobby){
            for(let i=0;i<totalPlayers;i++){
                if(currentLobby.players[i].userId== userId){
                    playerIndex=i;
                    break;
                }
            }
            currentLobby.players.splice(playerIndex,1);
            if(currentHostId == userId){
                currentLobby.hostId = currentLobby.players[0].userId;
            }
            currentLobby.save();
        }
        return currentLobby;
    }catch(err){
        console.log('DB-Error while removing a player');
    }
}

async function deleteLobby(cmpLobbyId){

    const currentLobby = await getCurrentLobby(cmpLobbyId);
    currentLobby.remove();
}

async function getPlayers(cmpLobbyId){
    try{
        const currentLobby = await getCurrentLobby(cmpLobbyId);
        if(currentLobby){
            return currentLobby.players;
        }
        return null;
    }catch(e){
        console.log('Db error while loading lobby\'s player');
    }

}
module.exports = {createLobby, getCurrentLobby,addPlayer,removePlayer,deleteLobby,getPlayers};