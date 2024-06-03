import Player from '../model/Player.js';
import Lobby from '../models/Lobby.js';

const lobbyController = (lobby) => {
    const enterLobby = (name) => {
        return lobby.enterLobby(name);
    };

    const createGame = (player) => {
        return lobby.createGame(player);
    };

    const joinGame = (player, gameId) => {
        return lobby.joinGame(player, gameId);
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
