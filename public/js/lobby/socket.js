// CLIENT - SOCKETS
const socket = io();
//const socket = io.connect('localhost:80', {reconnect: true});
socket.on('connect',()=>{
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
    addChat(false,chat.userName, chat.msg);
});

socket.on('return-ship',(data)=>{
    arrangeShipsOnBoard(data);
    updateOpponentScoreCard(calculateStrength(data.ships));
    updateMyScoreCard(calculateStrength(data.ships));
});

socket.on('handshake-data',(opponentName)=>{
    setOpponentName(opponentName);
})
socket.on('game-started',(gameSettings)=>{
    startTimer(5,gameSettings.boardSize,gameSettings.shipsCount);
});
function doHandshake(){
    socket.emit('player-handshake');
}

function gameStartedNotif(boardSize,shipsCount){
    socket.emit('game-start',{
        boardSize,shipsCount
    })
}
function getBoardSocket(boardSize,shipsCount){
    socket.emit('get-board',{
        boardSize,shipsCount
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
    updateOpponentHitPanel(data.row_index,data.col_index)
    attackOpponentBoardUI(data.response,data.row_index,data.col_index)
})


// Defenser
// Received attacked location (data.row_index,data.col_index)
socket.on('defend',(data)=>{
    myTurn=true;
    playGameAudio();
    const response = attackBoard(data.row_index,data.col_index);
    socket.emit('retreat',{
        response,
        row_index: data.row_index,
        col_index: data.col_index
    });
    
})
