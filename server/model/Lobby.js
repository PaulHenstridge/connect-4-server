import Player from "./Player.js";
import Game from "./Game.js";

export default class Lobby {
    constructor(){
        this.players = [];
        this.games = [];
    }

    enterLobby(name){
        const player = new Player(name);
        console.log('enter lobby player created', player)
        this.players.push(player);
        return player;
    }

    createGame(player){
        console.log("player in createGame ", player)
        const game = new Game([player])
        console.log("game in lobby create game ", game)
        game.players[0].playerNumber = 1;
        this.games.push(game);
        return game;
    }

    joinGame(player, gameId){
        const game = this.findGameById(gameId);

        if (!game) return 'Game not found';
        if(game.players.length >=2)return 'game full'

        game.players.push(player)
        player.playerNumber = game.players.length;
        return game;
    }

    viewOpenGames(){
        return this.games.filter( game => game.players.length === 1)
    }

    findGameById(gameId){
        return this.games.find(game => game.gameId === gameId);
    }

    findPlayerById(id){
        console.log('searched id in findPlayerById', id)
        return this.players.find(player => player.playerId === id)
    }
}