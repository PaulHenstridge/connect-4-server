
const socketHandlers = (io, controller) => {
    console.log('sockethandlers runs')

    io.on('connection', (socket) => {
        console.log('a user connected')

        // events
            // Lobby
                // Enter lobby - (name),
                socket.on('enterLobby', (playerName) => {
                    const response = controller.enterLobby(playerName)
                    console.log("enterLobby event response ", response)
                    socket.emit("newPlayerObject", response.newPlayer)
                    io.emit('enterLobbyResponse', response)
                });
                // create game - (playerId),
                socket.on('createGame', (playerId) => {
                    console.log('###data in createGame socketHandler ', playerId)
                    const response = controller.createGame(playerId)
                    console.log('response in sockethandler(19): ', response)
                    io.emit('createGameResponse', response)
                });
                //  join game - (playerId, gameId),
                socket.on('joinGame', (data) => {
                    const response = controller.joinGame(data.playerId, data.gameId)
                    console.log("joinGame event received");
                    io.emit('joinGameResponse', response)
                });
                // view open games
                socket.on('viewOpen', (data) => {
                    console.log("viewOpen event received")
                    return controller.viewOpenGames()
                });

            // Game 
                //  play turn - (plyer, columnIndex, gameId)
                socket.on('playTurn', ({playerId, columnIndex, gameId}) => {
                    console.log("playTurn event received")
                    const response = controller.playTurn(playerId, columnIndex, gameId)
                    console.log('playturn resonse ', response)
                    io.emit('playTurnResponse', response)
                });
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