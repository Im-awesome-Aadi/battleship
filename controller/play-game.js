/**
 * Lobby Page Controller
 */

 const pName = require('../utils/page-names')
 const lobbyDao = require('../service/lobby-dao');
 const Utils = require('../service/misc');
 require('../service/socket');
 /* GET REQUEST FOR LOBBY PAGE  
    /play/lobby/:id
 */
 exports.getLobbyPage = async(req,res)=>{  
     let userName = req.cookies.userName;
     let returnedLobby = await lobbyDao.getCurrentLobby(req.params.lobbyId);
     if(returnedLobby){
        if(returnedLobby.players.length<2){
            lobbyId = req.params.lobbyId;
            return res.render('lobby-page',{
                pTitle: pName.LOBBY,
                lobbyId,userName
            });
        }
        else{
            res.send('Lobby Full');
        }
     }else{
         return res.redirect('/error/404');
     }
 }

exports.getComputerPage = async(req,res)=>{
    let userName = req.cookies.userName;
    res.render('computer',{
        pTitle:pName.COMPUTER,userName
    });
}