import Player from "./Player.js";
import Game from "./Game.js";

export default class Lobby {
    constructor(){
        this.players = [];
        this.games = [];
    }

    enterLobby(name){
        const player = new Player(name);
        this.players.push(player);
        return player;
    }

    createGame(player){
        const game = new Game([player])
        game.players[0].playerNumber = 1;
        this.games.push(game);
    }

    joinGame(player, gameId){
        const game = this.games.find(game => game.gameId === gameId);
        if (!game) {
            return 'Game not found';
        }
        
        if(game.players.length >=2)return 'game full'
        game.players.push(player)
        player.playerNumber = game.players.length;
    }

    viewOpenGames(){
        return this.games.filter( game => game.players.length === 1)
    }
}