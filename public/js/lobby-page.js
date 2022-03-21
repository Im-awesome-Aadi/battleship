let lobbyId = $('.hidden-lobby-id').text();
let userName = $('.hidden-username').text();
let totalTeams = 2;
var c=0;
const socket = io();

socket.on('connect',()=>{
    console.log("conneected to server with id : " + socket.id);
});
socket.on('welcome',()=>{
    console.log("wow i am welcomed by server");
    socket.emit('pass-user-data',{
        userName,lobbyId
    });
    socket.emit('join-room');
});
$('.header-right-text').on('click',()=>{
    c++;
    console.log("clicked");
    const temp =['blue-alert-box','red-alert-box','green-alert-box'];
     $('.lobby-notification').prepend(`<div><strong>Someone has entered ${c}</strong><div>`)
     const tempNotif = $('.lobby-notification>div').first();
     $(tempNotif).addClass(temp[Math.floor(Math.random()*3)]);
    setTimeout(function(){
        $(tempNotif).remove();
      }, 3000);
})

socket.on('joined',(currentLobby)=>{
    console.log("you have joined this lobby");
    console.log(currentLobby);
    updateJoinedList(currentLobby.players);
    
})
socket.on('user-added',(currentLobby)=>{
    
    console.log('user added');
    updateJoinedList(currentLobby.players);
    
});

socket.on('player-left',(currentLobby)=>{
    
    console.log('player-left')
    console.log(currentLobby);
    updateJoinedList(currentLobby.players);
});

$('.send-chat').on('click',()=>{
    const chat = $('.cmp-input-message').val();
    if(chat){
        addChat(chat);
    }
})
$('.cmp-input-message').on('keypress',function(e) {
    if(e.which == 13) {
        const chat = $('.cmp-input-message').val();
        if(chat){
            addChat(chat);
        }
    }
});


$('.cmp-joined-member input[type="checkbox"]').on('change', function(evt) {
    const selectedPlayers = $('.cmp-joined-member input[type="checkbox"]:checked');
    const startGame = $('.start-game');
   if(selectedPlayers.length < totalTeams) {
    $('.cmp-joined-member input[type="checkbox"]').removeClass('not-allowed');
    startGame.addClass('inactive-button');
   }
    if(selectedPlayers.length == totalTeams){
        $('.cmp-joined-member input[type="checkbox"]:not(:checked)').addClass('not-allowed');
    startGame.removeClass('inactive-button');

    }
   if(selectedPlayers.length > totalTeams) {
       this.checked = false;

   }
});
$('.start-game').on('click',function(){
    const selectedPlayers = $('.cmp-joined-member input[type="checkbox"]:checked');
    if(selectedPlayers.length<totalTeams){
        
    }
    selectedPlayers.each(function(index,ele){
        console.log($(ele).attr('name'));
    })
});
function updateJoinedList(playerList){
    $('.member-list').html('')
    for(let i=0;i<playerList.length;i++){
        $('.member-list').append(`<li><div>${playerList[i]}</div><input type="checkbox"></li>`);
    }
}

function getRandomColorBox(){
    let colorBox =['blue-alert-box','red-alert-box','green-alert-box','yellow-alert-box'];
    let randomIndex = Math.floor(Math.random()*colorBox.length);
    return colorBox[randomIndex];
}

function addChat(chat){
    let randomColorBox = getRandomColorBox();
    
    $('.cmp-lobby-chat').append(`<fieldset><legend><i class='fa fa-user' ></i>Aditya</legend><div class=${randomColorBox}>${chat}</div></fieldset>`);
    $('.cmp-input-message').val('');
    $('.cmp-lobby-chat').scrollTop($('.cmp-lobby-chat').prop('scrollHeight'));
}