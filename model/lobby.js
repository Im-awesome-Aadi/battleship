
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LobbySchema = new schema({
    lobbyId:{
        type: String,
        required:true
    },
    hostName:{
        type:String,
        required:true
    },
    players:{
        type:Array,
        required:true
    }
});
LobbySchema.statics.getCurrentLobby= async function(cmpLobbyId){
    console.log(`finding lobby in DB model ${cmpLobbyId}`);
    
    const result = await this.model('Lobby').find();
    for(let i=0;i<result.length;i++){
        if(result[i].lobbyId == cmpLobbyId){
            console.log("room found " + result[i].lobbyId);
            return result[i];
        }
        
    }
    return false;
}

LobbySchema.statics.addPlayer = async function(cmpLobbyId, userName){
    console.log("Adding player to the DB")
    const currentLobby = await this.model('Lobby').getCurrentLobby(cmpLobbyId);
    if(currentLobby){
        currentLobby.players.push(userName);
        currentLobby.save();
    }
    return currentLobby;
}

LobbySchema.statics.removePlayer = async function(cmpLobbyId, userName){
    console.log("removing player from DB");
    const currentLobby = await this.model('Lobby').getCurrentLobby(cmpLobbyId);
    const currentHost = currentLobby.hostName;
    const totalPlayers = currentLobby.players.length;
    if(totalPlayers == 1){
        await this.model('Lobby').deleteLobby(cmpLobbyId);
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
}

LobbySchema.statics.deleteLobby = async function(cmpLobbyId){
    console.log("deleting the lobby");
    const currentLobby = await this.model('Lobby').getCurrentLobby(cmpLobbyId);
    currentLobby.remove();
}
const Lobby = mongoose.model('Lobby', LobbySchema);
module.exports = Lobby;