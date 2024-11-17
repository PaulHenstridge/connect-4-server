import { randomUUID } from 'crypto';

export default class Player{
    constructor(name, playerId, gamesPlayed=0, wins=0, friendIds = [] ){
        this.playerName = name;
        this.playerNumber = null;
        this.playerId = playerId || randomUUID();
        this.gamesPlayed = gamesPlayed;
        this.wins = wins;
        this.friendIds = [];
    }

    addFriend(playerId){
        this.friendIds.push(playerId)
        return this.friendIds
    }

    updateFriendIds(newIds){
        this.friendIds = newIds
    }

    quitGame(){
        console.log(this.name + " quit")
    }
}