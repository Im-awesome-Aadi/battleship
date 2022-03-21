// HELPER FUNCTIONS
function updateJoinedList(playerList){
    $('.member-list').html('')
    $('.member-list').append(`<li><div>${playerList[0]} (host)</div><input type="checkbox" name=${playerList[0]}></li>`);
    for(let i=1;i<playerList.length;i++){
        $('.member-list').append(`<li><div>${playerList[i]}</div><input type="checkbox" name=${playerList[i]}></li>`);
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