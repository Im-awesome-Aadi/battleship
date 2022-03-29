const Ship = require('./ship')
class Board{
    constructor(size,owner){
        this.size=size;
        this.ships=[];
        this.owner=owner
        this.strength=0;
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
            const addedShip = new Ship(element.type,element.size,parseInt(this.size),element.color);
            this.ships.push(addedShip);
            this.strength+=element.size;
        });
    }

    getStrength(){
        return this.strength;
    }
}

module.exports=Board;