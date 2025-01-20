
const socketHandlers = (io, controller, authController) => {

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id)
        const connectionId = socket.id

// events

    // Auth
        socket.on('signUp', async ({playerName, email, password}) => {

            const signUpResponse = await authController.signUp(playerName, email, password)

            if(socket.connected && !signUpResponse.error){

                const response = controller.enterLobby(playerName, signUpResponse.playerId, socket.id);
                
                console.log("SignUp event response ", response)

                socket.emit("playerObject", response.newPlayer);
                io.emit('enterLobbyResponse', response);

            } else {
                console.error(signUpResponse.error)
            }
        })

        socket.on('logIn',async ({email, password}) => {
            const logInResponse = await authController.logIn(email, password)
                if(socket.connected && !logInResponse.error){
                    // call new fuction in lobby - via gameController, returnToLobby(playerId)
                    const response = await controller.returnToLobby(logInResponse.playerId, socket.id)
                    // console.log("return to Lobby event response ", response)
                    socket.emit("playerObject", {player:response.player, friends: response.friends});
    
                    io.emit('returnToLobbyResponse', response);
                } else {
                    console.log("Connection Failed - socket not connected")
                }
            
        } )
    // Lobby
        // Enter lobby - (name), 
        socket.on('enterLobby', (playerName) => {
            if(socket.connected){
                const response = controller.enterLobby(playerName, socket.id);
                // console.log("enterLobby event response ", response)
                socket.emit("playerObject", response.newPlayer);
                io.emit('enterLobbyResponse', response);
            } else {
                console.log("Connection Failed - socket not connected")
            }
        });

        // Handle socket disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
            const response = controller.removeFromLobby(socket.id)
            // console.log('exitLobby event response', response)
            io.emit('exitLobbyResponse', response)
        })

        // create game - (playerId),
        socket.on('createGame', (playerId) => {
            const response = controller.createGame(playerId)
            if(response.success) socket.join(response.game.gameId)
            io.emit('createGameResponse', response);
        });
        //  join game - (playerId, gameId),
        socket.on('joinGame', (data) => {
            const response = controller.joinGame(data.playerId, data.gameId)
            console.log("joinGame response", response);
            if(response.success) socket.join(data.gameId)
            response.game.players.forEach(player => {
                console.log("player in forEach", player)
                const socketId = controller.getConnectionId(player.playerId)
                io.to(socketId).emit('joinGameResponse', response);
            })
        });
        // view open games
        socket.on('viewOpen', (data) => {
            console.log("viewOpen event received")
            return controller.viewOpenGames();
        });

    // Game 
        //  play turn - (plyer, columnIndex, gameId)
        socket.on('playTurn', ({playerId, columnIndex, gameId}) => {
            console.log("playTurn event received")
            const response = controller.playTurn(playerId, columnIndex, gameId);
            io.emit('playTurnResponse', response);
        });

        socket.on("rematch", ({playerId, gameId}) => {
            console.log("rematch event received")
            const response = controller.rematch(playerId, gameId);
            io.emit('rematchResponse', response);

        })
    // Player
        // TODO - quit - (player)
        socket.on('quit', (data) => {
            console.log("quit event received")
        });

        socket.on('addFriend', async data => {
            console.log("add friend event received", data)
            const response = await controller.addFriend(data.playerId, data.friendId)
            socket.emit('updateFriendsResponse', response)
        })
        // TODO - make both emit updateFriendResponse
        socket.on('unFriend', async data => {
            console.log("unfriend event received", data)
            const response = await controller.unFriend(data.playerId, data.friendId)
            socket.emit('updateFriendsResponse', response)
        })

        socket.on('invite', async data => {
            console.log("invite event received", data)

            // get invited player's connectionId from controller->lobby
            const inviteeConnectionId = controller.getConnectionId(data.friendId)
            console.log(inviteeConnectionId)
            const invitingPlayer = controller.getLobbyPlayerById(data.playerId)

            // use to send invite
            io.to(inviteeConnectionId).emit('invitation', invitingPlayer)
        })

        socket.on('acceptInvite', data => {
            const response = controller.acceptInvite(data.inviterId, data.inviteeId)
            response.game.players.forEach(player => {
                console.log("player in forEach", player)
                const socketId = controller.getConnectionId(player.playerId)
                io.to(socketId).emit('joinGameResponse', response);
            })

        })
        socket.on('declineInvite', data => {
            // const response = controller.declineInvite(data.friendId, data.playerId)
            //  needed, or just return a message?
        })



        // chat events
        socket.on('roomChatMsg', ({messageText, gameId, senderId, senderName}) => {
            console.log("Message event received",)
            socket.to(gameId).emit('roomMessage', {messageText, senderId, senderName})
        });
    });
};

export default socketHandlers