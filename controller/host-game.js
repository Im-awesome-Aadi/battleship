/**
 * Host Game Controller
 */
const Utils = require('../service/utils');
const lobbyDao = require('../service/lobbyDao');
/*
    GET REQUEST FOR HOSTING A GAME
    /host-game
 */
exports.getHostPage= async(req,res)=>{
    let lobbyId = Utils.createLobbyId();
    let createdLobby = await lobbyDao.createLobby(lobbyId,req.cookies.userName);
    if(createdLobby){
        res.redirect(`/lobby/${lobbyId}`);
    }else{
        res.redirect('/error');
    }
}

