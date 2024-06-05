import Player from '../model/Player.js';

const lobbyController = (lobby) => {
    const enterLobby = (name) => {
        return {
            success:lobby.enterLobby(name) instanceof Player,
            players: lobby.players
        } 
    };

    const createGame = (player) => {
        if (lobby.createGame(player) ){
            return {}
        };
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
