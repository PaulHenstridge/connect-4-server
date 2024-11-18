import Game from '../model/Game.js';
import Player from '../model/Player.js';


import {insertPlayer, updatePlayer, getPlayerById} from "../repositories/playerRepository.js";
import { addFriendToDb, getAllFriends, removeFriendFromDb } from '../repositories/playerFriendsRepository.js';


const controller = (lobby) => {


    const enterLobby = (name, playerId, socketId) => {
        const newPlayer = lobby.enterLobby(name, playerId, socketId)

        // add  to DB
        insertPlayer(newPlayer)

        return {
            success: newPlayer instanceof Player,
            newPlayer: newPlayer,
            players: lobby.getAllActivePlayers(),
            currentGames: lobby.games
        } 
    };

    const returnToLobby = async (playerId, socketId) => {
        const {player_name, games_played, wins} = await getPlayerById(playerId)
        const returningPlayer = lobby.returnToLobby(player_name, playerId, games_played, wins, socketId)

        // get players friends ids from DB
        const friendIds = await getAllFriends(playerId)
        returningPlayer.updateFriendIds(friendIds)

        const friends = await Promise.all(friendIds.map( async id => {
            const {player_name, games_played, wins} = await getPlayerById(id)
            return new Player(player_name, games_played, wins)
        }))

        return {
            success: returningPlayer instanceof Player,
            player: returningPlayer,
            players: lobby.getAllActivePlayers(),
            currentGames: lobby.games,
            friends: friends
        }

    }

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


    const addFriend = async (playerId, friendId) => {

        const player = lobby.findPlayerById(playerId);

        const { data, error } = await addFriendToDb(playerId, friendId);
        if (error) {
            console.error("Failed to add friend to DB:", error.message);
            const newFriendIds = player.addFriend(friendId)
            const newFriends = newFriendIds.map(friendId => lobby.findPlayerById(friendId))
            return newFriends

        } else {
            console.log("Friend added successfully:", data);
            const friendIds = await getAllFriends(playerId)
            // update player object form db
            player.updateFriendIds(friendIds)

            // get data from DB and return Player objects
            const newFriends = friendIds.map(async id => {
                const {player_name, playerId, games_played, wins} = await getPlayerById(id)
                return new Player(player_name, playerId, games_played, wins)
            })
            return newFriends
        }
    }

    const unFriend = async (playerId, friendId) => {

        const player = lobby.findPlayerById(playerId);

        const { data, error } = await removeFriendFromDb(playerId, friendId);
        if (error) {
            console.error("Failed to remove friend from DB:", error.message);
            // const newFriendIds = player.addFriend(friendId)
            // const newFriends = newFriendIds.map(friendId => lobby.findPlayerById(friendId))
            // return newFriends

        } else {
            console.log("Friend removed:", data);
            const friendIds = await getAllFriends(playerId)

            // get data from DB and return Player objects
            const newFriends = await Promise.all(friendIds.map(async id => {
                const {player_name, playerId, games_played, wins} = await getPlayerById(id)
                return new Player(player_name, playerId, games_played, wins)
            }))
            return newFriends
        }
    }

    return {
        enterLobby,
        returnToLobby,
        removeFromLobby,
        createGame,
        joinGame,
        viewOpenGames,
        playTurn,
        rematch,
        addFriend,
        unFriend
    };
};

export default controller;
