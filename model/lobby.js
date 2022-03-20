
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
module.exports = Lobby;