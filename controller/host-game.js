const lobbyModel = require('../model/lobby');
exports.getHostPage= (req,res)=>{


    var newLobby = new lobbyModel(null,req.cookies.userName);
    var roomId = newLobby.createLobbyId().lobbyId;
    
    res.redirect(`/lobby/${roomId}`);
}

