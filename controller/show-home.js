const Conf = require('../utils/conf');
const playerModel = require('../model/player');
const lobbyModel = require('../model/lobby');

let userName="";
let lobbyId ="";

exports.getHomePage= (req,res)=>{
    
    res.render('home-page');
}

exports.getLobbyPage = async(req,res)=>{
    
    
    userName = req.cookies.userName;
    const result = await lobbyModel.find()
    var found = false;
    result.forEach((current)=>{
        console.log(current.lobbyId);
        if(current.lobbyId == req.params.lobbyId){
            console.log("room found")
            found=true;
            lobbyId=req.params.lobbyId;
            return res.render('lobby-page',{
                lobbyId : current.lobbyId,
            });
        }
    });

    if(!found){
        return res.redirect('/');
    }
    
}

Conf.io.on('connection',function(socket){
        
    console.log("server "+socket.id);
    console.log("lobby is " + lobbyId);
    var createdPlayer = new playerModel(socket.id,userName);
    socket.on('join-room',()=>{
        socket.join(lobbyId);
    });
    

    socket.emit('welcome',userName) // Server sent this to the connected client
    socket.broadcast.to(lobbyId).emit('player-added',{
        createdPlayer:createdPlayer
    })


    socket.on('disconnect',()=>{
        Conf.io.emit('player-left','Player has left the lobby');
    });

});