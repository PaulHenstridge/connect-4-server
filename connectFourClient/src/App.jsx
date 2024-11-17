import { useState, useEffect } from 'react'
import './App.css'

import Board from './components/Board'
import ColumnButtons from './components/ColumnButtons'
import DisplayPanel from './components/DisplayPanel'
import Header from './components/Header'

import socket from './utils/socket'
import LogIn from './components/LogIn'
import Lobby from './components/Lobby'
import PlayAgain from './components/PlayAgain'
import Countdown from './components/Countdown'
import FourTiles from './components/FourTiles'
import ChatWindow from './components/ChatWindow'

import styled from 'styled-components'

const GameOn = styled.div`
  display:flex;
  /* flex-direction:column; */
  align-items:center;
`

function App() {
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ]);

  const [player, setPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});

  const [waitingForOpponent, setWaitingforOpponent] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  const [winner, setWinner] = useState(null);

  const [friends, setFriends] = useState([]);

  const [chatMessages, setChatMessages] = useState([]);

  // socket emitting
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

//

  useEffect(() => {
    if(winner !== null){
      console.log(`By the power of useEffect player ${winner} is the weeeeeener!`);
    }
  },[winner]);

  //socket listening
  useEffect(() => {
    socket.on('enterLobbyResponse', data => {
        console.log('enterLobby event received ', data);
        setGames(data.currentGames);
        setPlayers(data.players);
    });

    socket.on('returnToLobbyResponse', data => {
      console.log("ReturnLobby rrsponse -->", data)
      setGames(data.currentGames);
      setPlayers(data.players);
      setFriends(data.friends)
    })
 
    
    socket.on('playerObject', player => {
        console.log('newPlayerObject event received ', player);
        setPlayer(player); 
    });

    socket.on('createGameResponse', data => {
        console.log("createGame response received");
        setCurrentGame(data.game);
        setGames(data.currentGames);
        setWaitingforOpponent(true);
    });

    socket.on('joinGameResponse', data => {
        console.log("joinGame response received", data);
        if (data.success){
          setCurrentGame(data.game);
          setGameOn(true);
          setGames(data.currentGames);
        } else {
          console.log(game)
          // show error message in DOM
        }
    });

    socket.on('exitLobbyResponse', data => {
      console.log('exitLobby response received', data)
      if (data.success){
        setPlayers(data.activePlayers)
        //TODO - add a message - playername has disconnected
      }
    })
    
    socket.on('playTurnResponse', data => {
        console.log("playTurn response received", data);
        setCurrentGame(data.game);
        setBoard(data.game.board);
        setGameOver(data.isGameOver);
        setPlayers(data.newActivePlayers);
        if(data.isGameOver){
          console.log('gameOver playturn response', data)
        }

        // if gameOver call a function, pass in game, update everything
        // : player wins, formally end game and offer play again, any other admin...
    });

    socket.on("rematchResponse", data => {
      console.log("rematch response received", data);
      if(data.success){
        setCurrentGame(data.game);
        setBoard(data.game.board);
        setGameOn(true);
        setGameOver(false);
        setGames(data.currentGames);
      }
    })
    
    // make this updateFriendResponse and use for adding and removing, and also to keep list up to date!
    // adjust on b/e
    socket.on('addFriendResponse', (friends) => {
      console.log("add friend response received", friends);
      const friendsWithStatus = friends.map(friend => {
        console.log('ids%%%%%',friend.playerName, friend.playerId, players)
        const isActive = players.some(player => player.playerId === friend.playerId)
        return { ...friend, isActive }
      })
      setFriends(friendsWithStatus)
    })

    socket.on("roomMessage", (message) => {
      console.log('room message received', message)

      setChatMessages(prevMessages => [...prevMessages, message])
    })


    return () => {
        socket.off('enterLobbyResponse');
        socket.off('createGameResponse');
        socket.off('joinGameResponse');
        socket.off('playTurnResponse');
        socket.off('rematchResponse');
        socket.off('roomMessage');

    }
}, [socket])


// done - players online needs a list of players with an actual live connection, not just who has logged in.
// TODO - update wins on player objects.  add games played?
// TODO - add DB saving player ids, with wins losses etc
// TODO - add authentication

  return (
    <>
      <Header player={player} onCreateGame={createGame} gameOn={gameOn}/>
      

      {!gameOn && !player && <div>
           <LogIn onSignUp = {signUp} onLogIn={logIn}/>
           {/* <FourTiles /> */}
      </div>     
        }

        {player && !gameOn && <Lobby 
          players={players} 
          games={games} 
          onJoinGame={joinGame}
          player={player}
          friends={friends}
          onAddFriend={addFriend}
        />}

        
    
      {gameOn && <GameOn> 
        {/* <ColumnButtons boardArr={board} onColumnSelect={columnSelect}/> */}
        <Board boardArr={board} onColumnSelect={columnSelect}/>
        <ChatWindow onSendMessage={sendMessage} chatMessages={chatMessages} playerId={player.playerId}/>
      </GameOn>}

      {gameOn && gameOver && 
        <PlayAgain
          game={currentGame} 
          onPlayAgain={rematch} 
          playerId={player.playerId} 
          gameId={currentGame.gameId}
          onEndGame={endGame}
          />}
     
       <DisplayPanel gameOver={gameOver} winner={winner} />
    </>
  )
}

export default App
