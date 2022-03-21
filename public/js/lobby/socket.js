// SOCKETS
const socket = io();
socket.on('connect',()=>{
    console.log("conneected to server with id : " + socket.id);
});
socket.on('welcome',()=>{
    
    socket.emit('pass-user-data',{
        userName,lobbyId
    });
    socket.emit('join-room');

});

socket.on('joined',(currentLobby)=>{
    console.log("you have joined this lobby");
    console.log(currentLobby);
    updateJoinedList(currentLobby.players);
    setLobbyAlerts(0,null);
    
})
socket.on('user-added',(currentLobby,newPlayer)=>{
    
    console.log('user added');
    updateJoinedList(currentLobby.players);
    setLobbyAlerts(1,newPlayer);
    
});

socket.on('player-left',(currentLobby,leftPlayer)=>{
    
    console.log('player-left')
    console.log(currentLobby);
    updateJoinedList(currentLobby.players);
    setLobbyAlerts(2,leftPlayer);

});

socket.on('recd-msg',(chat)=>{
    addChat(chat.userName, chat.msg);
});

function sendToServer(userName,msg){
    socket.emit('send-msg',{
        userName,msg 
     });
}