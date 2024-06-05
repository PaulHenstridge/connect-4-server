import Game from '../model/Game.js';
import Player from '../model/Player.js';

const lobbyController = (lobby) => {
    const enterLobby = (name) => {
        const newPlayer = lobby.enterLobby(name)
        return {
            success: newPlayer instanceof Player,
            players: lobby.players
        } 
    };

    const createGame = (player) => {
        const newGame = lobby.createGame(player)
        console.log("new game: ", newGame)
        return {
            success: newGame instanceof Game,
            game: newGame
        };
    };

    const joinGame = (player, gameId) => {
        if(lobby.joinGame(player, gameId) instanceof Game){
            console.log("game created, lets play!")
        } else {
            console.log("no space in this game, return to open games")
        }
    };

    const viewOpenGames = () => {
        return lobby.viewOpenGames();
    };

    return {
        enterLobby,
        createGame,
        joinGame,
        viewOpenGames
    };
};

export default lobbyController;
