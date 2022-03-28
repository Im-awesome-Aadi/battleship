// CLIENT - SOCKETS
const socket = io();
socket.on('connect',()=>{
    console.log('conneected to server with id : ' + socket.id);
});
socket.on('welcome',()=>{
    
    socket.emit('pass-user-data',{
        userName,lobbyId
    });
    socket.emit('join-lobby');

});

socket.on('joined',(currentLobby)=>{

    
    updateLobbyUI(socket.id, currentLobby);
    setLobbyAlerts(0,null);
    
})
socket.on('user-added',(currentLobby,newPlayer)=>{

    updateLobbyUI(socket.id, currentLobby);
    setLobbyAlerts(1,newPlayer);
    
});

socket.on('player-left',(currentLobby,leftPlayer)=>{
    
    updateLobbyUI(socket.id, currentLobby);
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