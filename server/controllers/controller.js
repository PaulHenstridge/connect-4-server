import Game from '../model/Game.js';
import Player from '../model/Player.js';

const controller = (lobby) => {
    const enterLobby = (name) => {
        console.log('name passed to controller.enterLobby', name)
        const newPlayer = lobby.enterLobby(name)
        return {
            success: newPlayer instanceof Player,
            newPlayer: newPlayer,
            players: lobby.players,
            currentGames: lobby.games
        } 
    };

    const createGame = (playerId) => {
        const player = lobby.findPlayerById(playerId)
        console.log("player found in create game-> ", player)
        console.log('lobby',lobby)
        const newGame = lobby.createGame(player)
        console.log("new game: ", newGame)
        return {
            success: newGame instanceof Game,
            game: newGame,
            currentGames: lobby.games
        };
    };

    const joinGame = (playerId, gameId) => {
        const player = lobby.findPlayerById(playerId);
        const joinedGame = lobby.joinGame(player, gameId);

        return {
            success: joinedGame instanceof Game,
            game: joinedGame,
            currentGames: lobby.games
        }
    };

    const viewOpenGames = () => {
        return lobby.viewOpenGames();
    };

    const playTurn = (playerId, columnIndex, gameId) => {
        const player = lobby.findPlayerById(playerId);
        const game = lobby.findGameById(gameId);
        const isGameOver = game.playTurn(player, columnIndex);
        return { isGameOver, game };
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
