exports.createLobbyId =  ()=>{
    let str = '';
    for(var i=0;i<6;i++){
        str+=String.fromCharCode(Math.floor(Math.random()*26) + 65);
    }
    return str;
}