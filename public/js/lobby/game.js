
let opponentName ="";
function createEmptyBoard(className, size){
    let table_body='';
    $(`.${className}`).html('');
    for(let i=0;i<size;i++){
        table_body+='<tr>';
        for(let j=0;j<size;j++){
            table_body +='<td >';
            table_body +='&nbsp;';
            table_body +='</td>';
        }
        table_body+='</tr>';
        }
    table_body+='</table>';
    $(`.${className}`).html(table_body);
}

function arrangeShipsOnBoard(data){
    myBoard=data;
    let allShips = data.ships;
    let color=['red','green','blue','yellow','purple'];
    for(let i =0;i<allShips.length;i++){
        let currShip = allShips[i];
        let currSize = currShip.size;
        let currRow = currShip.start[0];
        let currCol = currShip.start[1];
        if(currShip.vertical){
            for(let j=0;j<currSize;j++){
                $(`.player-board tr:nth-child(${currRow+j+1}) td:nth-child(${currCol+1})`).addClass(`${color[i]}-ship-box`)
            }
        }else{
            for(let j=0;j<currSize;j++){
                $(`.player-board tr:nth-child(${currRow+1}) td:nth-child(${currCol+j+1})`).addClass(`${color[i]}-ship-box`)
            } 
        }
    }
}
function setOpponentName(name){
    opponentName = name;
    $('.cmp-opponent-name').text(`${opponentName} Arena`)
}
function attackOpponent(className,row_index,col_index){
    //updateOpponentHitPanel(row_index,col_index);
    attackOpponentSocket(row_index,col_index);
    setTurnPanel(opponentName);
    disableCell(className,row_index,col_index);
}

function damageShip(sIndex,ships){
    if(ships[sIndex].remaining){
        ships[sIndex].remaining--;
        if(!ships[sIndex].remaining){
            return {
                type:ships[sIndex].type,
                color:ships[sIndex].color
            }
        }
        return {
            color:ships[sIndex].color
        };
    }
}

function hitCell(r,c){
    let allShips = myBoard.ships;
    for(let i =0;i<allShips.length;i++){
        let currShip = allShips[i];
        let currSize = currShip.size;
        let currRow = currShip.start[0];
        let currCol = currShip.start[1];
        for(let j=0;j<currSize;j++){
            if(allShips[i].vertical){
                if(r==currRow+j && c==currCol){
                    return {
                        status: true,
                        ship: damageShip(i,myBoard.ships)
                    };
                }
            }else{
                if(r==currRow && c==currCol+j){
                    return {
                        status: true,
                        ship : damageShip(i,myBoard.ships)
                    };
                }

            }
        }
    }
    return {
        status: false,
    };
}
function disableCell(className,r,c){
    $(`.${className} tr:nth-child(${r+1}) td:nth-child(${c+1})`).css('pointer-events','none');
}
function attackBoard(r,c){
    updateMyHitPanel(r,c);
    setTurnPanel('Your');
    let attackStatus = hitCell(r,c);
    if(attackStatus.status){
        receivedHitSuccess(attackStatus.ship.color,r,c);
        myBoard.strength--;
        updateMyScoreCard(myBoard.strength);
        if(!myBoard.strength){
            // Opponent won
            showWinner(opponentName,myBoard.strength,)
            return{
                status:'won',
                damage:attackStatus.ship,
                strength:myBoard.strength
            }
        }

        return {
            status:true,
            damage:attackStatus.ship,
            strength:myBoard.strength
        }
    }
    else{
        receivedHitMiss(r,c);
        return {
            status:false
        }
    }
}


function receivedHitSuccess(color,r,c){
    $(`.player-board tr:nth-child(${r+1}) td:nth-child(${c+1})`).html(`<i style="color:${color}" class="fa-solid fa-skull"></i>`)
    $('.player-board-container .attack-status div:nth-child(2)').append(' HIT');
}

function receivedHitMiss(r,c){
    $(` .player-board tr:nth-child(${r+1}) td:nth-child(${c+1})`).html(`<i class="fa-solid fa-xmark"></i>`);
    $('.player-board-container .attack-status div:nth-child(2)').append(' MISS');

}


function attackOpponentBoardUI(result,r ,c){

    if(result.status){
        updateOpponentScoreCard(result.strength)
        $(`.opponent-board tr:nth-child(${r +1}) td:nth-child(${c+1})`).html(`<i style="color:${result.damage.color}" class="fa-solid fa-skull"></i>`);
        $('.opponent-board-container .attack-status div:nth-child(2)').append(' HIT');
        if(result.status =='won'){
            //updateOpponentScoreCard(result.strength)
            showWinner('You');
            //updateOpponentStatus(result.damage);
        }else if(result.damage.type !==undefined){
            //updateOpponentStatus(result.damage);
        }
        //updateGameStatusPanel(false,true,r,c);
    }else{
        $(`.opponent-board tr:nth-child(${r +1}) td:nth-child(${c+1})`).html(`<i class="fa-solid fa-xmark"></i>`);
        $('.opponent-board-container .attack-status div:nth-child(2)').append(' MISS');
        //updateGameStatusPanel(false,false,r,c);
    }
        
}
function updateMyHitPanel(r,c){
    ri= r+1;
    ci=getChar(c);
    let tempC = $('.player-board-container .attack-status div:nth-child(2)');
    $(tempC).html(`Last Hit : ${ri}${ci}`);      
}

function updateOpponentHitPanel(r,c){
    ri= r+1;
    ci=getChar(c);
    let tempC = $('.opponent-board-container .attack-status div:nth-child(2)');
    $(tempC).html(`Last Hit : ${ri}${ci}`);      
}

function updateMyScoreCard(strength){
    $('.player-score').html(`Strength : ${strength}`);
 }
 function updateOpponentScoreCard(strenth){
    $('.opponent-score').html(`Strength : ${strenth}`);
 }

 function setTurnPanel(turn){
    $('.whose-turn').html(`${turn}'s Turn `);
 }

 function calculateStrength(allShips){
    let strength=0;
    allShips.forEach((e)=>{
        strength+=e.size;
    });
    return strength;
 }

 
 function showWinner(winner){
    $('.next-game-popup').css('display','flex');
    $('.winner').html(`${winner} Won`);
     //$('.final-score').html(`${pStrength} - ${oStrength}`)
    $('.cmp-game-card').css('opacity',0.3)    

 }