import socket from "./socket";

export const initializeListeners = callbacks => {

    socket.on('enterLobbyResponse', callbacks.onEnterLobby)
    socket.on('returnToLobbyResponse', callbacks.onReturnToLobby)
    socket.on('playerObject', callbacks.onPlayerObject)
    socket.on('createGameResponse', callbacks.onCreateGame)
    socket.on('joinGameResponse', callbacks.onJoinGame)
    socket.on('exitLobbyResponse', callbacks.onExitLobby)
    socket.on('playTurnResponse',callbacks.onPlayTurn)
    socket.on("rematchResponse", callbacks.onRematch)
    socket.on('updateFriendsResponse', callbacks.onUpdateFriends)
    socket.on("roomMessage",callbacks.onRoomMessage)

    return () => {
        socket.off('enterLobbyResponse')
        socket.off('returnToLobbyResponse')
        socket.off('playerObject')
        socket.off('createGameResponse')
        socket.off('joinGameResponse')
        socket.off('exitLobbyResponse')
        socket.off('playTurnResponse')
        socket.off("rematchResponse")
        socket.off('updateFriendsResponse')
        socket.off("roomMessage")
    }
}