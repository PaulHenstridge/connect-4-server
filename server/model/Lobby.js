import Player from "./Player.js";
import Game from "./Game.js";

export default class Lobby {
    constructor(){
        this.activePlayers = new Map();
        this.games = [];
    }

    enterLobby(name, playerId, socketId){
        const player = new Player(name, playerId);
        this.activePlayers.set(player.playerId, { player, socketId})
        return player;
    }

    returnToLobby(playerName, playerId, gamesPlayed, wins, socketId){
        const player = new Player(playerName, playerId, gamesPlayed, wins)
        this.activePlayers.set(player.playerId, { player, socketId})
        return player;
    }

    createGame(player){
        const game = new Game([player])
        game.players[0].playerNumber = 1;
        this.games.push(game);
        return game;
    }

    joinGame(player, gameId){
        const game = this.findGameById(gameId);

        if (!game) return 'Game not found';
        if(game.players.length >=2)return 'game full'
        // if ( game.gameOver === false && player.playerId === this.players[0].playerId){
        //     return "Cannot join your own game"
        // }

        game.players.push(player)
        player.playerNumber = game.players.length;
        for(let player of game.players){
            player.gamesPlayed++
            
        }
        return game;
    }

    viewOpenGames(){
        return this.games.filter( game => game.players.length === 1)
    }

    findGameById(gameId){
        return this.games.find(game => game.gameId === gameId);
    }

    updateGame(gameId){
        
    }

    findPlayerById(id){
        console.log('searched id in findPlayerById', id)
        const entry = this.activePlayers.get(id);
        return entry ? entry.player : undefined;
    }


    findConnectionIdByPlayerId(id) {
        const entry = this.activePlayers.get(id);
        return entry ? entry.connectionId : undefined;
    }

    removePlayerById(id) {
        console.log('removing player with id', id);
        this.activePlayers.delete(id);
    }
    getAllActivePlayers() {
        // Map entries to extract only the player objects
        return Array.from(this.activePlayers.values()).map(entry => entry.player);
    }
    removePlayerByConnectionId(socketId) {
        console.log("active players", this.activePlayers)
        for (const [playerId, entry] of this.activePlayers.entries()){
            console.log("======",socketId, entry.connectionId)
            if (entry.connectionId === socketId){
                this.activePlayers.delete(playerId);
                console.log(`player ${playerId} removed form lobby`)
                return true;
            }
        }
        console.log('No player found with that connection ID');
        return false;
    }
}