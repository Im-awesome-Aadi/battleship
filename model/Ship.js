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

module.exports = Ship;