import Game from '../model/Game.js';
import Player from '../model/Player.js';

const controller = (lobby) => {

    const enterLobby = (name, socketId) => {
        const newPlayer = lobby.enterLobby(name, socketId)
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

    // TODO - set up periodic pings to check for disconnects.  above only works for a deliberate disconnect.
    // create a quit buttin to use the above, and pings to check for drop outs.

    const createGame = (playerId) => {
        const player = lobby.findPlayerById(playerId)
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
        console.log("playTurn called")
        const player = lobby.findPlayerById(playerId);
        const game = lobby.findGameById(gameId);
        const isGameOver = game.playTurn(player, columnIndex);
        // if(isGameOver) player.wins++
        const newActivePlayers = lobby.getAllActivePlayers()
        console.log("newActivePlayers passed from playTurn after a win", newActivePlayers)

        return { isGameOver, game, newActivePlayers };
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
