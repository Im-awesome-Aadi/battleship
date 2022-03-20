const lobbyModel = require('../model/lobby');;
exports.getCurrentLobby=async (cmpLobbyId)=>{
    console.log(`finding lobby in DB ${cmpLobbyId}`);

    const result = await lobbyModel.find();
    for(let i=0;i<result.length;i++){
        if(result[i].lobbyId == cmpLobbyId){
            console.log("room found " + result[i].lobbyId);
            return result[i];
        }
        
    }
    return false;
}