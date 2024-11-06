import { randomUUID } from 'crypto';

export default class Player{
    constructor(name, playerId ){
        this.playerName = name;
        this.playerNumber = null;
        this.playerId = playerId || randomUUID();
        this.gamesPlayed = 0;
        this.wins = 0;
        this.friendIds = [];
    }

    addFriend(playerId){
        this.friendIds.push(playerId)
        return this.friendIds
    }

    quitGame(){
        console.log(this.name + " quit")
    }
}