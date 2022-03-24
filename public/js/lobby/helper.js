// HELPER FUNCTIONS
function updateJoinedList(playersList){
    $('.member-list').html('');
    $('.member-list').append(`<li><div>${playersList[0].userName} (host)</div><input type="checkbox" name=${playersList[0].userName}></li>`);
    for(let i=1;i<playersList.length;i++){
        $('.member-list').append(`<li><div>${playersList[i].userName}</div><input type="checkbox" name=${playersList[i].userName}></li>`);
    }
    updatePlayerCount(playersList.length);
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