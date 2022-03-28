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

socket.on('return-ship',(data)=>{
    arrangeShipsOnBoard('player-board',data);
});

socket.on('handshake-data',(opponentName)=>{
    setOpponentName(opponentName);
})

function doHandshake(myName){
    socket.emit('player-handshake',myName);
}
function getBoardSocket(boardSize){
    socket.emit('get-board',{
        boardSize,shipData
    });
}
function sendToServer(userName,msg){
    socket.emit('send-msg',{
        userName,msg 
     });
}

//  Attacker
function attackOpponentSocket(row_index,col_index){
    socket.emit('attack',{
        row_index,col_index
    })
}

// Received attack response and attacked location (data.response, data.row_index,data.col_index)
socket.on('attack-response',(data)=>{
    console.log(data);
    attackOpponentBoardUI(data.response,data.row_index,data.col_index)
})


// Defenser
// Received attacked location (data.row_index,data.col_index)
socket.on('defend',(data)=>{
    console.log(data);
    const response = attackBoard(data.row_index,data.col_index);
    socket.emit('retreat',{
        response,
        row_index: data.row_index,
        col_index: data.col_index
    });
})