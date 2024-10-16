import { randomBytes } from 'crypto';

export default class Player{
    constructor(name){
        this.playerName = name;
        this.playerNumber = null;
        this.playerId = randomBytes(16).toString('hex');
        this.gamesPlayed = 0;
        this.wins = 0;
        this.friends = [];
    }

    addFriend(player){
        this.friends.push(player)
        return this.friends
    }

    quitGame(){
        console.log(this.name + " quit")
    }
}