function showPlayerStatus(board){
 
    $('.player-status').html('');

    let allShips = board.ships;
    for(let i=0;i<allShips.length;i++){
        $('.player-status').append(`<p style="color:${allShips[i].color}">${allShips[i].type} - ${allShips[i].remaining} (${allShips[i].size})</p>`);
    }
}
function computerTurn(player){
    let r = Math.floor(Math.random()*player.size);
    let c = Math.floor(Math.random()*player.size);
    if(!attackPlayerBoardUI(player,r,c)){
        computerTurn(player);
    }
    giveTurnToComputer(false);

}
function updateOpponentStatus(ships){

    $('.opponent-status').append(`<p style="color:${ships.color}">${ships.type} has been destroyed</p>`);
}
function attackPlayerBoardUI(player,r,c){
    console.log(player)
    let result = player.attackBoard(r,c);
    if(result.status === ''){
        return false;
    }else{
        if(result.status){
            updatePlayerScoreCard(result.strength)
            console.log("c hit")
            console.log(result)
            $(`.player-board tr:nth-child(${r+1}) td:nth-child(${c+1})`).html(`<i style="color:${result.damage.color}" class="fa-solid fa-skull"></i>`)
            if(result.status =='won'){

                updatePlayerScoreCard(result.strength)
                //showPlayerStatus(player)
                showWinner(opponent.owner,player.strength,opponent.strength);
            }else{
                //showPlayerStatus(player)

            }
            updateGameStatusPanel(true,true,r,c);
        }else{
            $(` .player-board tr:nth-child(${r+1}) td:nth-child(${c+1})`).html(`<i class="fa-solid fa-xmark"></i>`)
            updateGameStatusPanel(true,false,r,c);
        }
        
        return true;
    }
}
 function attackOpponentBoardUI(result,r ,c){
    console.log(result)
    if(result.status === ''){
        alert("Already attacked");
        return false;
    }else{
        if(result.status){
            updateOpponentScoreCard(result.strength)
            $(`.opponent-board tr:nth-child(${r +1}) td:nth-child(${c+1})`).html(`<i style="color:${result.damage.color}" class="fa-solid fa-skull"></i>`);
            if(result.status =='won'){
                updateOpponentScoreCard(result.strength)
                showWinner(player.owner,player.strength,opponent.strength);
                //updateOpponentStatus(result.damage);
            }else if(result.damage.type !==undefined){
                //updateOpponentStatus(result.damage);
            }
            updateGameStatusPanel(false,true,r,c);
        }else{
            $(`.opponent-board tr:nth-child(${r +1}) td:nth-child(${c+1})`).html(`<i class="fa-solid fa-xmark"></i>`);
            updateGameStatusPanel(false,false,r,c);
        }
        
    }
 }

 function updatePlayerScoreCard(strength){
    $('.player-score').html(`Strength : ${strength}`);
 }
 function updateOpponentScoreCard(strenth){
    $('.opponent-score').html(`Strength : ${strenth}`);
 }
 function giveTurnToComputer(flag){
    if(flag){

        $('.opponent-board').css({'pointer-events':'none'})
        $('.whose-turn').html('Computer turn');
    }else{
     console.log("not")
     $('.whose-turn').html(`${player.owner}'s Turn `);
     $('.opponent-board').css({'pointer-events':'auto'})

    }
 }
 function updateGameStatusPanel(isComputer,isHit,r,c){
     ri= r+1;
     ci=String.fromCharCode(65+c);
    if(isComputer){
        let tempP = $('.player-board-container .attack-status div:nth-child(2)');
        $(tempP).html(`Last Hit : ${ri}${ci}`);
        if(isHit)
            $(tempP).append(' HIT');
        else
            $(tempP).append(' MISS');
    }else{
        let tempC = $('.opponent-board-container .attack-status div:nth-child(2)');
        $(tempC).html(`Last Hit : ${ri}${ci}`);   
        if(isHit)
            $(tempC).append(' HIT');
            else
            $(tempC).append(' MISS');

    }
    console.log(ri,ci);
 }

 function showWinner(winner,pStrength,oStrength){
    $('.next-game-popup').css('display','flex');
    $('.winner').html(`${winner} Won By`);
     $('.final-score').html(`${pStrength} - ${oStrength}`)
    $('.cmp-game-card').css('opacity',0.3)    

 }