
debugger;
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
            await setUserNameCookie(userName);

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
    const enteredLobbyId = roomIDEle.val().toUpperCase();
    if(validateLobbyID(enteredLobbyId)){
      window.location.href= `/lobby/${enteredLobbyId}`;
    }
    else{
      alert("Invalid Lobby Id");
  }
    
});

$('#host-game').on('click',(e)=>{
    e.preventDefault();
  window.location.href= '/host-game';
});

