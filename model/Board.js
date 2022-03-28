const Ship = require('./Ship')
class Board{
    constructor(size,owner){
        this.size=size;
        this.ships=[];
        this.owner=owner
        this.className = 'className'
        this.strength=0;
    }

 
    createBoard(){     
        let table_body='';
        $(`.${this.className}`).html('');
        for(let i=0;i<this.size;i++){
            table_body+='<tr>';
            for(let j=0;j<this.size;j++){
                table_body +='<td >';
                table_body +='&nbsp;';
                table_body +='</td>';
            }
            table_body+='</tr>';
          }
        table_body+='</table>';
        $(`.${this.className}`).html(table_body);
    }

    getBoardStatus(){
        return this;
    }
    getShipsPosition(shipData){
        Ship.flock=[];
        this.ships=[];
        this.remaining=[];
        this.strength=0;
        shipData.forEach(element => {
            this.ships.push(new Ship(element.type,element.size,this.size,element.color))
            this.strength+=element.size;
        });
    }

    getStrength(){
        return this.strength;
    }
}

module.exports=Board;