
const socketHandlers = (io, controller) => {
    console.log('sockethandlers runs')

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id)
        const connectionId = socket.id

// events
    // Lobby
        // Enter lobby - (name),
        socket.on('enterLobby', (playerName) => {
            if(socket.connected){
                const response = controller.enterLobby(playerName, socket.id);
                console.log("enterLobby event response ", response)
                socket.emit("newPlayerObject", response.newPlayer);
                io.emit('enterLobbyResponse', response);
            } else {
                console.log("Connection Failed - socket not connected")
            }
        });

        // Handle socket disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
            const response = controller.removeFromLobby(socket.id)
            console.log('exitLobby event response', response)
            io.emit('exitLobbyResponse', response)
        })

        // create game - (playerId),
        socket.on('createGame', (playerId) => {
            console.log('###data in createGame socketHandler ', playerId)
            const response = controller.createGame(playerId)
            console.log('response in sockethandler(19): ', response)
            io.emit('createGameResponse', response);
        });
        //  join game - (playerId, gameId),
        socket.on('joinGame', (data) => {
            const response = controller.joinGame(data.playerId, data.gameId)
            console.log("joinGame event received");
            io.emit('joinGameResponse', response);
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
        // quit - (player)
        socket.on('quit', (data) => {
            console.log("quit event received")
        });



        // chat events
        socket.on('message', (data) => {
            console.log("Message event received")
        });


        socket.on('quit', () => {
            console.log('user quat')
        });
    });
};

export default socketHandlers