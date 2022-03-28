let shipData=[
    {type:'Destroyer',size:2,color:'rgba(236, 77, 77, 0.81)'},
    {type:'Submarine',size:3,color:'rgba(36, 241, 6, 0.46)'},
    {type:'Cruiser',size:3,color:'rgba(6, 241, 226, 0.81)'},
    {type:'Battleship',size:4,color:'rgba(241, 142, 6, 0.81)'},
    {type:'Carrier',size:5,color:'rgba(238, 26, 238, 0.81)'}
];

let myBoard="";
let opponentName="";
// HELPER FUNCTIONS
function updateLobbyUI(pId,currentLobby){
    let playersList = currentLobby.players;
    $('.member-list').html('');
    $('.member-list').append(`<li><div>${playersList[0].userName} (host)</div></li>`);
    for(let i=1;i<playersList.length;i++){
        $('.member-list').append(`<li><div>${playersList[i].userName}</div></li>`);
    }
    updatePlayerCount(playersList.length);
    hostSetting(pId,currentLobby.hostId)
    updateStartButton(playersList.length);
}

function getNameFromId(currentLobby,userId){
    for(let i=0;i<currentLobby.players.length;i++){
        if(currentLobby.players[i].userId == userId){
            return currentLobby.players[i].userName;
        }
    }
}
function hostSetting(userId,hostId){
    if(userId != hostId){
        $('.member-list input').addClass('hide-ele');
        $('.start-game').addClass('hide-ele');
        $('.joined-member-header small').addClass('hide-ele');
        $('.game-setting').addClass('hide-ele')
    }else{
        $('.member-list input').removeClass('hide-ele');   
        $('.start-game').removeClass('hide-ele');
        $('.game-setting').removeClass('hide-ele');
    }
}

function updatePlayerCount(totalPlayers){
    $('.joined-member-header .total-players').text(totalPlayers);
}
function updateStartButton(totalPlayers){
    const startGame = $('.start-game');
    if(totalPlayers < 2) {
     $(startGame).addClass('hide-ele');
    }
    if(totalPlayers == 2){
        $(startGame).removeClass('hide-button'); 
    }
}
function getRandomColorBox(){
    let colorBox =['blue-alert-box','red-alert-box','green-alert-box','yellow-alert-box'];
    let randomIndex = Math.floor(Math.random()*colorBox.length);
    return colorBox[randomIndex];
}

function addChat(sender,chat){
    let randomColorBox = getRandomColorBox();
    
    $('.cmp-lobby-chat').append(`<fieldset><legend><i class='fa fa-user' ></i>${sender}</legend><div class=${randomColorBox}>${chat}</div></fieldset>`);
    $('.cmp-input-message').val('');
    $('.cmp-lobby-chat').scrollTop($('.cmp-lobby-chat').prop('scrollHeight'));
}

function setLobbyAlerts(index,playerName){
    const alertClass =['blue-alert-box','green-alert-box','red-alert-box'];
    let alertText="";
    if(index==0){
        alertText="Welcome !!!";
    }else if(index==1){
        alertText= `${playerName} has joined the lobby`;
    }else if(index==2){
        alertText= `${playerName} has left the lobby`;
    }
    $('.lobby-notification').prepend(`<div><strong>${alertText}</strong><div>`)
    const addedAlert = $('.lobby-notification>div').first();
    $(addedAlert).addClass(alertClass[index]);
   setTimeout(function(){
       $(addedAlert).remove();
     }, 10000);
}

function startTimer(duration, display) {
    let timer = duration;
    let id = setInterval(function () {
        $(display).text( `Game will ${timer} seconds`);
        timer--;
        if(timer<0){
          clearInterval(id);
          showGameScreen();
          return;
        }
    }, 1000);
}

function showGameScreen(){
    $('.lobby-page-card').addClass('hide-ele');
    $('.cmp-game-screen').addClass('show-ele');
    createEmptyBoard('player-board',10);
    createEmptyBoard('opponent-board',10);
    getBoardSocket(10,shipData);
    doHandshake();
}

