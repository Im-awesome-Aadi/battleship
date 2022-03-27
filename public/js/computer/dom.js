let boardSize = 10;
let pName = $('.player-name').text();
var player = new Board(boardSize,'player-board',pName);
let opponent = new Board(boardSize,'opponent-board','Computer');
let shipData=[
    {type:'Destroyer',size:2,color:'rgba(236, 77, 77, 0.81)'},
    {type:'Submarine',size:3,color:'rgba(36, 241, 6, 0.46)'},
    {type:'Cruiser',size:3,color:'rgba(6, 241, 226, 0.81)'},
    {type:'Battleship',size:4,color:'rgba(241, 142, 6, 0.81)'},
    {type:'Carrier',size:5,color:'rgba(238, 26, 238, 0.81)'}
];

$(document).ready(function(){
    player.getShipsPosition(shipData);
    player.createBoard();
    player.arrangeShipsOnBoard();
    updateOpponentScoreCard(opponent.strength);
    updatePlayerScoreCard(player.strength);
    
});
$('.refresh-board').on('click',function(){
    player.getShipsPosition(shipData);
    player.createBoard();
    player.arrangeShipsOnBoard();
});

$('.start-game').on('click',function(){
    opponent.getShipsPosition(shipData);
    opponent.createBoard();
    //opponent.arrangeShipsOnBoard();
    updateOpponentScoreCard(opponent.strength);
    updatePlayerScoreCard(player.strength);
    giveTurnToComputer(false);
    //showPlayerStatus(player.getBoardStatus());
    
});

$(document.body).on('click','.opponent-board td', function(){
    let row_index = $(this).parent().index();
    let col_index = $(this).index();
    let result = opponent.attackBoard(row_index,col_index);
    if(attackOpponentBoardUI(result,row_index,col_index)){
       // showPlayerStatus(player.getBoardStatus());
    }
    giveTurnToComputer(true);
    setTimeout(function(){
        computerTurn(player)
    },1000);

 });

 $(document.body).on('click','.next-game-popup button:nth-child(1)',()=>{
    window.location.href='/play/computer';
 });

 $(document.body).on('click','.next-game-popup button:nth-child(2)',()=>{
    window.location.href='/';
});