let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
function showFlexElement(ele){
    $(ele).css('display','flex');
}
function hideElement(ele){
    $(ele).css('display','none');
}
function showBlockElement(ele){
    $(ele).css('display','block');
}
function validateUserName(userName){
    var userNameRegex = /^[A-Za-z][A-Za-z0-9_]{3,19}$/;
    if(userNameRegex.test(userName)){
        return true;
    }
    return false;
}

function validateLobbyID(lobbyId){
    var lobbyIdRegex = /^([A-Z]){6}$/;
    if(lobbyIdRegex.test(lobbyId)){
        return true;
    }
    return false;
}
async function setUserNameCookie(userName){
  try{
    await fetch('/cookie/set', {
        method: 'post',
        headers: headers,
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'include',
        body: JSON.stringify({userName})
      });
  }catch(e){
      console.log("error while saving cookie");
      console.log(e);
  }
}

$('.game-name').on('click',()=>{
    playAudio();
    
})
function playAudio(){
    const audio = new Audio('/assets/notif.mp3');
    audio.play();
}
let isHidden=true;
$('.chat-button').on('click',()=>{
    if(isHidden){
        $('.chat-popup').css('display','flex')
        isHidden=false;
    }else{
        $('.chat-popup').css('display','none');
        isHidden=true;

    }
})