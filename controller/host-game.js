/**
 * Host Game Controller
 */
const Utils = require('../service/utils');
//const lobbyModel = require('../model/lobby');
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

    /*
    const newLobby = new lobbyModel({
        lobbyId : lobbyId,
        hostName : req.cookies.userName,
        players : []
    });
    let isCreated = await lobbyModel.createLobby(newLobby);
    console.log(isCreated);
    if(isCreated){
        res.redirect(`/lobby/${lobbyId}`);
    }else{
        res.redirect('/error');
    }
    */
}

