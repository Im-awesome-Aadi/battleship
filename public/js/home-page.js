
let userName="";
fetchUserName();

async function fetchUserName() {
  console.log("Checkibnf user name n cookie")
  var response = await fetch('/cookie/get');
  var responseText = await response.json();
  if(responseText){
    userName = responseText;
    console.log(userName)
    showSecondCard();
  }
  else{
    showFirstCard();
  }
}

// Submit user Name
var enteredNameEle = $('#user-name');
$('.submit-name').on('click',async(e)=>{
    e.preventDefault();
    
    if(validateUserName(enteredNameEle.val())){
        userName = enteredNameEle.val();
        
        console.log("username set");
        showSecondCard();
        try {     
            await fetch('/cookie/set', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                
                  userName: userName
                
              })
            });

          } catch(err) {
            console.error(`Error: ${err}`);
          }
        
        
    }else{
        alert("Please Enter user name in required format");
    }
});
// Submit user Name
var roomIDEle= $('#room-id');
var roomId = document.getElementById('room-id');
$('.join-room').on('click',(e)=>{
    e.preventDefault();
    var enteredLobbyId = roomIDEle.val().toUpperCase();
    if(validateLobbyID(enteredLobbyId)){
      window.location.href= `/lobby/${enteredLobbyId}`;
    }
    else{
      alert("Invalid Lobby Id");
  }
    
});

$('#host-game').on('click',(e)=>{
  e.preventDefault();
  
  //console.log("enteredf room id is " + roomIDEle.val());
  window.location.href= '/host-game';
});
function roomJoined(){
    
   console.log("user clicked on join-room")
}



function showSecondCard(){
  hideElement($('.home-page-card'));
        showFlexElement($('.cmp-ready-to-play'));
        showFlexElement($('.cmp-greet'));
        $('.greet-text').text(userName);
}
function showFirstCard(){
  hideElement($('.cmp-ready-to-play'));
  hideElement($('.cmp-greet'));
}
