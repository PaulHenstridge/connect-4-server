const socketHandlers = (io, lobbyController) => {
    console.log('sockethandlers runs')

    io.on('connection', (socket) => {
        console.log('a user connected')

        // events
            // Lobby
                // Enter lobby - (name),
                socket.on('enterLobby', async (data) => {
                    lobbyController.enterLobby(data.name)
                    // get method to return bool to use as check for success
                    console.log("enterLobby event received")
                });
                // create game - (player),
                socket.on('createGame', async (data) => {
                    console.log("createGame event received")
                });
                //  join game - (player, gameId),
                socket.on('joinGame', async (data) => {
                    console.log("joinGame event received")
                });
                // view open games
                socket.on('viewOpen', async (data) => {
                    console.log("Join event received")
                });
            // Game 
                //  play turn - (plyer, columnIndex)
                socket.on('playTurn', async (data) => {
                    console.log("playTurn event received")
                });
            // Player
                // quit - (player)
                socket.on('quit', async (data) => {
                    console.log("quit event received")
                });



        // chat events
        socket.on('message', async (data) => {
            console.log("Message event received")
        });


        socket.on('quit', () => {
            console.log('user quat')
        });
    });
};

export default socketHandlers