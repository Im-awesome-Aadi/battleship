const dbService = require('../service/db');
//require('../service/socket');

/* GET REQUEST FOR HOME PAGE  
   /
*/
exports.getHomePage= (req,res)=>{
    
    res.render('home-page');
}
/* GET REQUEST FOR LOBBY PAGE  
   /lobby/:id
*/
exports.getLobbyPage = async(req,res)=>{
    
    /*
    let userName = req.cookies.userName;
    let returnedLobby = await dbService.getCurrentLobby(req.params.lobbyId);
    if(returnedLobby){
        lobbyId = req.params.lobbyId;
        return res.render('lobby-page',{
            lobbyId,userName
        });
    }else{
        return res.redirect('/');
    }
    */
    let userName = req.cookies.userName;
    res.render('lobby-page',{
        lobbyId:'QWERTY',userName
    });
}