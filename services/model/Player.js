import { randomBytes } from 'crypto';

class Player{
    constructor(name){
        this.name = name;
        this.playerId = randomBytes(16).toString('hex');
        this.wins = 0;
    }

    quitGame(){

    }
}