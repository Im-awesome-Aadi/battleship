
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
    var userNameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
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
    await fetch('/cookie/set', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userName})
    });
}

