// HELPER FUNCTIONS
function updateJoinedList(currentLobby){
    const players = currentLobby.players;
    $('.member-list').html('');
    $('.member-list').append(`<li><div>${players[0]} (host)</div><input type="checkbox" name=${players[0]}></li>`);
    for(let i=1;i<players.length;i++){
        $('.member-list').append(`<li><div>${players[i]}</div><input type="checkbox" name=${players[i]}></li>`);
    }
    hostSetting(currentLobby);
    updatePlayerCount(players.length);
}
function hostSetting(currentLobby){
    if(currentLobby.hostName != userName){
        $('.member-list input').addClass('hide-ele');
        $('.start-game').addClass('hide-ele');
        $('.joined-member-header small').addClass('hide-ele');
    }else{
        $('.member-list input').removeClass('hide-ele');   
        $('.start-game').removeClass('hide-ele');
        $('.joined-member-header small').removeClass('hide-ele');

    }
}

function updatePlayerCount(totalPlayers){
    $('.joined-member-header .total-players').text(totalPlayers);
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