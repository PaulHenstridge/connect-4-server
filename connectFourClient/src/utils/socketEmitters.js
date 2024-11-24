import socket from "./socket";

const signUp = (playerName, email, password) => {
    socket.emit('signUp', {playerName, email, password})
  };
  const logIn = (email, password) => {
    socket.emit('logIn', {email, password})
  };

  const createGame = playerId => {
    socket.emit('createGame', playerId)
  };

  const joinGame = (playerId, gameId) => {
    socket.emit('joinGame', {playerId, gameId})
  };

  const columnSelect = (columnIndex, playerId, gameId, gameOver) => {
    if (gameOver) return;

    socket.emit('playTurn', {
        playerId,
        columnIndex,
        gameId
      });
    
    };

  const declareWinner = (winner) => {
    setGameOver(true) //unneeded?
    setWinner(winner)
  }

  const addFriend = (friendId, playerId) => {
    socket.emit('addFriend', {
      friendId,
      playerId
    })
  }

  const unFriend = (friendId, playerId) => {
    socket.emit('unFriend', {
      friendId,
      playerId
    })
  }

  const sendMessage = (messageText, senderName, senderId, gameId) => {
    console.log('sendMessage called!')
    const messageObj = {
      messageText,
      senderId,
      senderName
    }
    setChatMessages(prevMessages => [...prevMessages, messageObj])
    socket.emit('roomChatMsg', {
        messageText,
        gameId,
        senderId,
        senderName
    })
  }

  const rematch = (playerId, gameId) => {
    socket.emit("rematch", {playerId:player.playerId, gameId:currentGame.gameId});
  }

  const endGame = () => {
    socket.emit("endGame", 
    // TODO - neeed to send an event to both players, or the other player to end the game on their end
    )
    setGameOn(false)
    setGameOver(false)
    setCurrentGame({})
    setBoard([
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ])
  }

  export {signUp, logIn, createGame, joinGame, columnSelect, declareWinner, addFriend, unFriend, sendMessage, rematch, endGame}