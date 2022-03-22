/**
 * Lobby Page Controller
 */

const lobbyModel = require('../model/lobby');
require('../service/socket');
/* GET REQUEST FOR LOBBY PAGE  
   /lobby/:id
*/
exports.getLobbyPage = async(req,res)=>{
    
    
    let userName = req.cookies.userName;
    let returnedLobby = await lobbyModel.getCurrentLobby(req.params.lobbyId);
    if(returnedLobby){
        lobbyId = req.params.lobbyId;
        return res.render('lobby-page',{
            lobbyId,userName
        });
    }else{
        return res.redirect('/');
    }
}