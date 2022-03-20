const misc = require('../utils/misc')
const lobbyModel = require('../model/lobby');
/*
    GET REQUEST FOR HOSTING A GAME
    /host-game
 */
exports.getHostPage= async(req,res)=>{

    let lobbyId = misc.createLobbyId();
    const newLobby = new lobbyModel({
        lobbyId : lobbyId,
        hostName : req.cookies.userName,
        players : []
    });
    await newLobby.save();
    res.redirect(`/lobby/${lobbyId}`);
}

