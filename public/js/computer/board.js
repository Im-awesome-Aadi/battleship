class Ship{
    static flock=[];
    constructor(type,size,blen,color){
        this.type=type;
        this.size=size;
        this.remaining=size;
        this.color=color;
        this.start = this.getStartingPoint(size,blen);
        Ship.flock.push(this);
        return this;
    }
    getStartingPoint(size,blen){
        this.vertical = Math.floor(Math.random()*2);
        let r = Math.floor(Math.random()*(blen+1-size));
        let c = Math.floor(Math.random()*blen);
        
        if(this.vertical){
            if(this.validatePoints(r,c,this.vertical)){
                return this.getStartingPoint(size,blen);
            }
            return [r,c];
        }else{
            if(this.validatePoints(c,r,this.vertical)){
                return this.getStartingPoint(size,blen);
            }
            return [c,r];
        }
    }

    validatePoints(r,c,v){
        let shipArray = Ship.flock;
        for(let i=0;i<shipArray.length;i++){
            let curr = shipArray[i];
            let currRow = curr.start[0];
            let currCol = curr.start[1];
            //Both ships are vertical
            if(curr.vertical && v){
                if((currCol == c) && this.overlapping(currRow,curr.size,r,this.size)){
                    return true; // Not possible starting point
                }
            }
            //Both ships are horizontal
            if(!(curr.vertical && v)){
                if((currRow == r) && this.overlapping(currCol,curr.size,c,this.size)){
                    return true; // Not possible starting point
                }
            }

            //Stored ship is horizontal

            if(!curr.vertical && v){
                if((r<=currRow)&& (currRow<=(r+this.size)) && (currCol<= c) && (c<=currCol+curr.size)){
                    return true;
                }
            }

            //Stored ship is vertical

            if(curr.vertical && !v){
                if((currRow<=r)&& (r<=(currRow + curr.size)) && (c<= currCol) && (currCol<=c+this.size)){
                    return true;
                }                
            }
        }
        return false;
    }

    overlapping(f,flen,s,slen){
        if(f==s){
            return true;
        }
        if(f<s){
            if(f+flen>=s){
                return true;
            }
            return false;
        }else{
            if(s+slen>=f){
                return true;
            }
            return false;
        }
    }
}
class Board{
    constructor(size,className,owner){
        this.size=size;
        this.ships=[];
        this.owner=owner
        this.className = className
        this.attacked=[];
        this.strength=0;
    }

    ifAttacked(r,c){
        let cellNumber = r*10+c;
        if(this.attacked.includes(cellNumber)){
            return true;
        }
        this.attacked.push(cellNumber);
        return false;
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
    damageShip(sIndex){
        if(this.ships[sIndex].remaining){
            this.ships[sIndex].remaining--;
            if(!this.ships[sIndex].remaining){
                return {
                    type:this.ships[sIndex].type,
                    color:this.ships[sIndex].color
                }
            }
            return {
                color:this.ships[sIndex].color
            };
        }
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
    arrangeShipsOnBoard(){

        let allShips = this.ships;
        let color=['red','green','blue','yellow','purple'];
        for(let i =0;i<allShips.length;i++){
            let currShip = allShips[i];
            let currSize = currShip.size;
            let currRow = currShip.start[0];
            let currCol = currShip.start[1];
            if(currShip.vertical){
                for(let j=0;j<currSize;j++){
                    $(`.${this.className} tr:nth-child(${currRow+j+1}) td:nth-child(${currCol+1})`).addClass(`${color[i]}-ship-box`)
                }
            }else{
                for(let j=0;j<currSize;j++){
                    $(`.${this.className} tr:nth-child(${currRow+1}) td:nth-child(${currCol+j+1})`).addClass(`${color[i]}-ship-box`)
                } 
            }
        }
    }
    hitCell(r,c){
        let allShips = this.ships;
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
                            ship: this.damageShip(i)
                        };
                    }
                }else{
                    if(r==currRow && c==currCol+j){
                        return {
                            status: true,
                            ship : this.damageShip(i)
                        };
                    }

                }
            }
        }
        return {
            status: false,
        };
    }

    disableCell(r,c){
        $(`.${this.className} tr:nth-child(${r+1}) td:nth-child(${c+1})`).css('pointer-events','none');
    }
    attackBoard(r,c){
        if(this.ifAttacked(r,c)){
            return{ status:'',strength:this.strength}
        }else{
            this.disableCell(r,c)
            let attackStatus = this.hitCell(r,c);
            if(attackStatus.status){
                this.strength--;
                if(!this.strength){
                    return{
                        status:'won',
                        damage:attackStatus.ship,
                        strength:this.strength
                    }
                }
                return {
                    status:true,
                    damage:attackStatus.ship,
                    strength:this.strength
                }
            }
            else{
                return {
                    status:false
                }
            }
        }
    
    }

    getStrength(){
        return this.strength;
    }
}