
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
});

$(document).ready(()=>{
//$('.cmp-board-size').on('click',()=>{
    let boardSizeData = [{
        id: 5,
        text: 5,
        shipData: [2, 3]
      },
      {
        id: 6,
        text: 6,
        shipData: [2, 3, 4]
      },
      {
        id: 7,
        text: 7,
        shipData: [2, 3, 4]
      },
      {
        id: 8,
        text: 8,
        shipData: [2, 3, 4, 5]
      },
      {
        id: 9,
        text: 9,
        shipData: [2, 3, 4, 5]
      },
      {
        id: 10,
        text: 10,
        shipData: [2, 3, 4, 5]
      }
    ]
        $('.cmp-board-size').select2({
            data:boardSizeData,
            placeholder:'Select'
        });
        $('.cmp-ships-count').select2({
            placeholder:'Select'
        })
        $(".cmp-board-size").val("");
        $(".cmp-board-size").trigger("change");
        $('.cmp-board-size').change(function(){
        $('.cmp-ships-count').empty();
    
        for(let k in boardSizeData){
            if(boardSizeData[k].id == $(this).val()){
                $('.cmp-ships-count').select2({
                    data:boardSizeData[k].shipData,
                });
                break;
            }
        }

    });
});
$('.start-game').on('click',function(){
    if( $('.cmp-ships-count').val()==null && $('.cmp-board-size').val()==null ){
        alert('Select game details');
    }else{
        $('.start-game').css('display','none');
        startTimer(5,'.game-countdown');
        const selectedPlayers = $('.cmp-joined-member input[type="checkbox"]:checked');
        if(selectedPlayers.length<totalTeams){
            
        }
        selectedPlayers.each(function(index,ele){
     
        })
    }
});


