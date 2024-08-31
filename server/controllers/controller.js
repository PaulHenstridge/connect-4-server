import Game from '../model/Game.js';
import Player from '../model/Player.js';

const controller = (lobby) => {

    const enterLobby = (name) => {
        const newPlayer = lobby.enterLobby(name)
        return {
            success: newPlayer instanceof Player,
            newPlayer: newPlayer,
            players: lobby.getAllActivePlayers(),
            currentGames: lobby.games
        } 
    };

    const removeFromLobby = socketId => {
        return {
            success: lobby.removePlayerByConnectionId(socketId),
            activePlayers: lobby.getAllActivePlayers()
        }
    }

    // TODO - set up periodic pings to check for disconnects.  above only works for a deliverate disconnect.
    // create a quit buttin to use the above, and pings to check for drop outs.

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

    const rematch = ((playerId, gameId) => {
        const player = lobby.findPlayerById(playerId);
        const game = lobby.findGameById(gameId);
        game.rematch[player.playerNumber] = true;

        if(game.gameOver && game.rematch[1] && game.rematch[2]){
            console.log("BOTH PLAYERS WANT TO PLAY AGAIN!!")
            const newGame = createGame(game.players[1].playerId).game;

            return joinGame(game.players[0].playerId, newGame.gameId);
        }else{
            return {
                success: false,
                game: game,
                currentGames: lobby.games
            }
        };
    });

    return {
        enterLobby,
        removeFromLobby,
        createGame,
        joinGame,
        viewOpenGames,
        playTurn,
        rematch
    };
};

export default controller;
