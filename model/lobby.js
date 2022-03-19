
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LobbySchema = new schema({
    lobbyId:{
        type: String,
        required:true
    },
    hostName:{
        type:String,
        required:true
    },
    players:{
        type:Array,
        required:true
    }
});

const Lobby = mongoose.model('Lobby', LobbySchema);
/*
class Lobby{
    static lobbies=[];
    constructor(lobbyId, hostName){
        this.lobbyId=lobbyId;
        this.hostName=hostName;
        this.players =[hostName];
    }

    createLobbyId(){
        let str = "";
        for(var i=0;i<6;i++){
            str+=String.fromCharCode(Math.floor(Math.random()*26) + 65);
        }
        this.lobbyId = str;
        Lobby.lobbies.push(this);
        return this;
    }

    static fetchLobby(lobbyId){

        Lobby.lobbies.forEach(function(item, index){
            console.log("lobies " + item.lobbyId)
            console.log("your lo " + lobbyId)
            if(item.lobbyId == lobbyId){
                return item;
            }
        });
        //return false;
    }
}
*/
module.exports = Lobby;