import { randomBytes } from 'crypto';

class Player{
    constructor(name){
        this.name = name;
        this.playerNumber = null;
        this.playerId = randomBytes(16).toString('hex');
        this.wins = 0;
    }

    quitGame(){

    }
}