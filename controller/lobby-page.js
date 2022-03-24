/**
 * Lobby Page Controller
 */

const pName = require('../utils/page-names')
const lobbyDao = require('../service/lobby-dao');
require('../service/socket');
/* GET REQUEST FOR LOBBY PAGE  
   /lobby/:id
*/
exports.getLobbyPage = async(req,res)=>{  
    let userName = req.cookies.userName;
    let returnedLobby = await lobbyDao.getCurrentLobby(req.params.lobbyId);
    if(returnedLobby){
        lobbyId = req.params.lobbyId;
        return res.render('lobby-page',{
            pTitle: pName.LOBBY,
            lobbyId,userName
        });
    }else{
        return res.redirect('/error/404');
    }
}