import Game from '../model/Game.js';
import Player from '../model/Player.js';

import {insertPlayer, updatePlayer} from "../repositories/playerRepository.js";


const controller = (lobby) => {

    const enterLobby = (name, socketId) => {
        const newPlayer = lobby.enterLobby(name, socketId)

        // add  to DB
        insertPlayer(newPlayer)

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
        const player = lobby.findPlayerById(playerId);
        const game = lobby.findGameById(gameId);
        const isGameOver = game.playTurn(player, columnIndex);
        // Update DB
        if(isGameOver) {
            for (let pl of game.players){
                updatePlayer(pl)
            }
        }
        
        const newActivePlayers = lobby.getAllActivePlayers()

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


    // TODO - when DB is added, store ALL REGISTERED PLAYERS (not jut those active now)
    //  recreate new friend objectsd from this alll players array/table, not lobby
    const addFriend = (playerId, friendId) => {
        const player = lobby.findPlayerById(playerId);

        const newFriendIds = player.addFriend(friendId)

        const newFriends = newFriendIds.map(friendId => lobby.findPlayerById(friendId)
        )

        return newFriends
    }

    return {
        enterLobby,
        removeFromLobby,
        createGame,
        joinGame,
        viewOpenGames,
        playTurn,
        rematch,
        addFriend
    };
};

export default controller;
