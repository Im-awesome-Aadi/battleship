const lobbyModel = require('../model/lobby');

async function createLobby(lobbyId,hostName){
    try{
        const newLobby = new lobbyModel({lobbyId ,hostName,players : []});
        return await newLobby.save();
    }catch(e){
        console.log('db error while creating lobby');
    }
}

async function getCurrentLobby(cmpLobbyId){
    try{
        const result = await lobbyModel.find();
        for(let i=0;i<result.length;i++){
            if(result[i].lobbyId == cmpLobbyId){
                console.log("room found " + result[i].lobbyId);
                return result[i];
            }
            
        }
        console.log("not found");
        return false;    
    }catch(err){
        console.log('db error while finding lobby');
    }
}

async function addPlayer(cmpLobbyId, userName){
    console.log("Adding player to the DB")
    try{
        const currentLobby = await getCurrentLobby(cmpLobbyId);
        if(currentLobby){
            currentLobby.players.push(userName);
            currentLobby.save();
        }
        return currentLobby;
    }catch(e){
        console.log('db error while adding a player');
    }
}

async function removePlayer(cmpLobbyId, userName){
    console.log("removing player from DB");
    try{
        const currentLobby = await getCurrentLobby(cmpLobbyId);
        const currentHost = currentLobby.hostName;
        const totalPlayers = currentLobby.players.length;
        if(totalPlayers == 1){
            await deleteLobby(cmpLobbyId);
            return false;
        }
        let playerIndex=0;
        if(currentLobby){
            for(let i=0;i<totalPlayers;i++){
                if(currentLobby.players[i]== userName){
                    playerIndex=i;
                    break;
                }
            }
            currentLobby.players.splice(playerIndex,1);
            if(currentHost == userName){
                currentLobby.hostName = currentLobby.players[0];
            }
            currentLobby.save();
        }
        return currentLobby;
    }catch(err){
        console.log('DB-Error while removing a player');
    }
}

async function deleteLobby(cmpLobbyId){
    console.log("deleting the lobby");
    const currentLobby = await getCurrentLobby(cmpLobbyId);
    currentLobby.remove();
}
module.exports = {createLobby, getCurrentLobby,addPlayer,removePlayer,deleteLobby};