import socket from "./socket";

const signUp = (playerName, email, password) => {
    socket.emit('signUp', {playerName, email, password});
  };
  const logIn = (email, password) => {
    socket.emit('logIn', {email, password});
  };

  const createGame = playerId => {
    socket.emit('createGame', playerId);
  };

  const joinGame = (playerId, gameId) => {
    socket.emit('joinGame', {playerId, gameId});
  };

  const columnSelect = (columnIndex) => {
    if (gameOver) return;

    socket.emit('playTurn', {
        playerId: player.playerId,
        columnIndex: columnIndex,
        gameId: currentGame.gameId
      });
    
    };

  const declareWinner = (winner) => {
    setGameOver(true); //unneeded?
    setWinner(winner);
  }

  const addFriend = friendId => {
    socket.emit('addFriend', {
      friendId:friendId,
      playerId: player.playerId
    })
  }

  const unFriend = friendId => {
    socket.emit('unFriend', {
      friendId:friendId,
      playerId: player.playerId
    })
  }

  const sendMessage = (messageText) => {
    console.log('sendMessage called!')
    const messageObj = {
      messageText: messageText,
      senderId: player.playerId,
      senderName: player.playerName
    }
    setChatMessages(prevMessages => [...prevMessages, messageObj])
    socket.emit('roomChatMsg', {
        messageText:messageText,
        gameId: currentGame.gameId,
        senderId: player.playerId,
        senderName: player.playerName
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