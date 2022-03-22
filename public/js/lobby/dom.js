
var lobbyId = $('.hidden-lobby-id').text();
var userName = $('.hidden-username').text();
let totalTeams = 2;


$('.send-chat').on('click',()=>{
    const msg = $('.cmp-input-message').val();
    if(msg){
        addChat(userName,msg);
        sendToServer(userName,msg);
    }
});
$('.cmp-input-message').on('keypress',function(e) {
    if(e.which == 13) {
        const msg = $('.cmp-input-message').val();
        if(msg){
            addChat(userName,msg);
            sendToServer(userName,msg);
        }
    }
});

$(document.body).on('click','.cmp-joined-member input', () => {
    
    const selectedPlayers = $('.cmp-joined-member input[type="checkbox"]:checked');
    const startGame = $('.start-game');
   
   if(selectedPlayers.length < totalTeams) {
    $('.cmp-joined-member input[type="checkbox"]').removeClass('not-allowed');
    $(startGame).addClass('inactive-button');
   }
    if(selectedPlayers.length == totalTeams){
        $('.cmp-joined-member input[type="checkbox"]:not(:checked)').addClass('not-allowed');
        $(startGame).removeClass('inactive-button');

    }
   if(selectedPlayers.length > totalTeams) {
       this.checked = false;

   }
});
$('.lobby-page-header .header-right div:nth-child(2)').on('click',function(){
    window.location.href = '/';
})
$('.start-game').on('click',function(){
    const selectedPlayers = $('.cmp-joined-member input[type="checkbox"]:checked');
    if(selectedPlayers.length<totalTeams){
        
    }
    selectedPlayers.each(function(index,ele){
        console.log($(ele).attr('name'));
    })
});


