import { logInUser,signUpUser } from "./auth.js";

const socketHandlers = (io, controller) => {

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id)
        const connectionId = socket.id

// TODO -  enterLobby becomes logInPlayer.  check auth, if ok, do the below
//         also need a signUpNewPlayer.  when successful, then enterLobby stuff happens

// events

    // Auth
        socket.on('signUp', (userName, email, password) => {
            const {data,error} = signUpUser(email, password)
            // TODO - get id from DB and use in app
            if(!error){
                if(socket.connected){
                    const response = controller.enterLobby(userName, socket.id);
                    console.log("SignUp event response ", response)
                    socket.emit("newPlayerObject", response.newPlayer);
                    io.emit('enterLobbyResponse', response);
                } else {
                    console.log("Connection Failed - socket not connected")
                }
            }
        })

        socket.on('logIn',(email, password) => {
            const {data, error} = logInUser(email, password)
            // TODO - get values form data to produce player object
            if(!error){
                if(socket.connected){
                    const response = controller.returnToLobby(userName, socket.id);
                    console.log("returnToLobby event response ", response)
                    // socket.emit("newPlayerObject", response.newPlayer);
                    io.emit('returnToLobbyResponse', response);
                } else {
                    console.log("Connection Failed - socket not connected")
                }
            }
        } )
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
            const response = controller.createGame(playerId)
            if(response.success) socket.join(response.game.gameId)
            io.emit('createGameResponse', response);
        });
        //  join game - (playerId, gameId),
        socket.on('joinGame', (data) => {
            const response = controller.joinGame(data.playerId, data.gameId)
            console.log("joinGame event received");
            if(response.success) socket.join(data.gameId)
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

        socket.on('addFriend', data => {
            console.log("add friend event received", data)
            const response = controller.addFriend(data.playerId, data.friendId)
            console.log('response back from add friend', response)
            socket.emit('addFriendResponse', response)
        })



        // chat events
        socket.on('roomChatMsg', ({messageText, gameId, senderId, senderName}) => {
            console.log("Message event received",)
            socket.to(gameId).emit('roomMessage', {messageText, senderId, senderName})
        });
    });
};

export default socketHandlers