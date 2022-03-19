
var socket = io();

socket.on('connect',()=>{
    console.log("my " + socket.id);
});
socket.on('welcome',(userName)=>{
    
    $('.member-list').append(`<li>${userName}</li>`)
});

socket.on('player-added',(newPlayer)=>{
    
    console.log('player-add')
    
    $('.member-list').append(`<li>${newPlayer.createdPlayer.pName}</li>`)
});
socket.emit('join-room')
socket.on('player-left',(obj)=>{
    console.log(obj)
    console.log('player-left')
});
$('.start-game').on('click',function(){
    socket.emit('start-game','data');
})