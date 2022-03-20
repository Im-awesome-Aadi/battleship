let lobbyId = $('.hidden-lobby-id').text();
let userName = $('.hidden-username').text();
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
    console.log("clicked");
    $('.lobby-notification').append('<span>Someone has entered</span>')
})
//$('.cmp-lobby-chat').scrollTop($('.cmp-lobby-chat').height())
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
$('.start-game').on('click',function(){
    socket.emit('start-game','data');
});

function updateJoinedList(playerList){
    $('.member-list').html('')
    for(let i=0;i<playerList.length;i++){
        $('.member-list').append(`<li>${playerList[i]}</li>`);
    }
}