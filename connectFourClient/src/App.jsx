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
import { useAppContext } from './context/AppContext'

import {signUp, logIn, createGame, joinGame, columnSelect, declareWinner, addFriend, unFriend, sendMessage, rematch, endGame} from './utils/socketEmitters.js'
import { initializeListeners } from './utils/socketListeners'

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

  // const [player, setPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  // const [currentGame, setCurrentGame] = useState({});

  const [waitingForOpponent, setWaitingforOpponent] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  const [winner, setWinner] = useState(null);

  const [friends, setFriends] = useState([]);

  const [chatMessages, setChatMessages] = useState([]);

  const {player, setPlayer, currentGame, setCurrentGame} = useAppContext()

  //socket listening
  useEffect(() => {
    const cleanup = initializeListeners({
      onEnterLobby:data => {
        console.log('enterLobby event received ', data)
        setGames(data.currentGames)
        setPlayers(data.players)
      },
      onReturnToLobby: data => {
        console.log("ReturnLobby rrsponse -->", data)
        setGames(data.currentGames)
        setPlayers(data.players)
        setFriends(data.friends)
      },
      onPlayerObject:player => {
        console.log('newPlayerObject event received ', player)
        setPlayer(player); 
      },
      onCreateGame:data => {
        console.log("createGame response received")
        setCurrentGame(data.game)
        setGames(data.currentGames)
        setWaitingforOpponent(true)
      },
      onJoinGame: data => {
        console.log("joinGame response received", data);
        if (data.success){
          setCurrentGame(data.game);
          setGameOn(true);
          setGames(data.currentGames);
        } else {
          console.log(game)
          // TODO - show error message in DOM
        }
      },
      onExitLobby: data => {
      console.log('exitLobby response received', data)
      if (data.success){
        setPlayers(data.activePlayers)
        //TODO - add a message - playername has disconnected
      }
      },
      onPlayTurn:data => {
        console.log("playTurn response received", data);
        setCurrentGame(data.game);
        setBoard(data.game.board);
        setGameOver(data.isGameOver);
        setPlayers(data.newActivePlayers);
        if(data.isGameOver){
          console.log('gameOver playturn response', data)
        }
      },
      onRematch:data => {
        console.log("rematch response received", data);
        if(data.success){
          setCurrentGame(data.game);
          setBoard(data.game.board);
          setGameOn(true);
          setGameOver(false);
          setGames(data.currentGames);
        }
      }, 
      onUpdateFriends: friends => {
        console.log("update friend response received", friends);
        const friendsWithStatus = friends.map(friend => {
          const isActive = players.some(player => player.playerId === friend.playerId)
          return { ...friend, isActive }
        })
        setFriends(friendsWithStatus)
      },
      onRoomMessage: (message) => {
        console.log('room message received', message)

        setChatMessages(prevMessages => [...prevMessages, message])
      }
    })
    return () => cleanup()
},[])


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
          onUnfriend={unFriend}
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
