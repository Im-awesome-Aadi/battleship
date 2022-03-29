let userName='';
fetchUserName();

async function fetchUserName() {
  var response = await fetch('/cookie/get');
  var responseText = await response.json();
  if(responseText){
    userName = responseText;
    showSecondCard();
  }
  else{
    showFirstCard();
  }
}

// Submit user Name

$('.submit-name').on('click',async(e)=>{
    e.preventDefault();
    submitName();
});
$('#user-name').focus(function(){
  $('.user-name-rules').css('display','block');
})
$('#user-name').on('keypress',function(e) {
  if(e.which == 13) {
    e.preventDefault();
    submitName();
  }
});
$('.play-computer').on('click',function(){
  window.location.href='/play/computer';
})
// Submit user Name
/*
$('.join-room').on('click',(e)=>{
    e.preventDefault();
    enterLobby();
     
});*/
$('#room-id').on('keypress',function(e) {
  if(e.which == 13) {
    e.preventDefault();
    enterLobby();  
  }
});

$('.have-lobby').on('click',function(e){
  $(this).addClass('hide-ele');
  $('.room-id-wrap').removeClass('hide-ele');
  $('.room-id-wrap').addClass('flex-ele');
});

$('#host-game').on('click',(e)=>{
    e.preventDefault();
  window.location.href= '/host-game';
});

