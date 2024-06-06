import Game from '../model/Game.js';
import Player from '../model/Player.js';

const controller = (lobby) => {
    const enterLobby = (name) => {
        const newPlayer = lobby.enterLobby(name)
        return {
            success: newPlayer instanceof Player,
            players: lobby.players
        } 
    };

    const createGame = (playerId) => {
        const player = lobby.findPlayerById(playerId)
        const newGame = lobby.createGame(player)
        console.log("new game: ", newGame)
        return {
            success: newGame instanceof Game,
            game: newGame
        };
    };

    const joinGame = (player, gameId) => {
        const joinGameResponse = lobby.joinGame(player, gameId);
        return {
            success: joinGameResponse instanceof Game,
            game: joinGameResponse
        }
    };

    const viewOpenGames = () => {
        return lobby.viewOpenGames();
    };

    const playTurn = (playerId, columnIndex, gameId) => {
        const player = lobby.findPlayerById(playerId);
        const game = lobby.findGameById(gameId);
        const gameOver = game.playTurn(player, columnIndex)
        return { gameOver, game }
    }

    return {
        enterLobby,
        createGame,
        joinGame,
        viewOpenGames,
        playTurn
    };
};

export default controller;
