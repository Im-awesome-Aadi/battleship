
async function submitName(){
  const enteredNameEle = $('#user-name');
  if(validateUserName(enteredNameEle.val())){
    userName = enteredNameEle.val();
    try {     
        await setUserNameCookie(userName);
        showSecondCard();
      } catch(err) {
        console.error(`Error: ${err}`);
      }  
  }
  else{
    alert('Please Enter user name in required format');
  }
}

function enterLobby(){
  const enteredLobbyId = $('#room-id').val().toUpperCase();
      if(validateLobbyID(enteredLobbyId)){
        window.location.href= `play/lobby/${enteredLobbyId}`;
      }
      else{
        alert('Invalid Lobby Id');
      }
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
  