/**
 * Host Game Controller
 */
const Utils = require('../service/misc');
const lobbyDao = require('../service/lobby-dao');
/*
    GET REQUEST FOR HOSTING A GAME
    /host-game
 */
exports.getHostPage= async(req,res)=>{
    let lobbyId = Utils.createLobbyId();
    let createdLobby = await lobbyDao.createLobby(lobbyId,'');
    if(createdLobby){
        res.redirect(`play/lobby/${lobbyId}`);
    }else{
        res.redirect('/error/404');
    }
}

