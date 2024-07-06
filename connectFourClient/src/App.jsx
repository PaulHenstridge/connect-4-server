import { useState, useEffect } from 'react'
import './App.css'

import Board from './components/Board'
import ColumnButtons from './components/ColumnButtons'
import DisplayPanel from './components/DisplayPanel'
import Header from './components/header'

import socket from './utils/socket'
import LogIn from './components/LogIn'
import Lobby from './components/Lobby'


function App() {
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ]);

  const [playerId, setPlayerId] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [gameOn, setGameOn] = useState(false);

const [winner, setWinner] = useState(null);

  // socket emitting
  const enterLobby = playerName => {
    socket.emit('enterLobby', playerName);
  }

  const createGame = playerId => {
    socket.emit('createGame', playerId);
  }

  const joinGame = (playerId, gameId) => {
    socket.emit('joinGame', playerId);
  }

  const onColumnSelect = (columnIndex) => {
    if (gameOver) return;

    socket.emit('playTurn');
    
    };

  const declareWinner = (winner) => {
    setGameOver(true);
    setWinner(winner);
  }


  useEffect(() => {
    if(winner !== null){
      console.log(`By the power of useEffect player ${winner} is the weeeeeener!`);
    }
  },[winner]);

  //socket listening
  useEffect(() => {
    socket.on('enterLobbyResponse', data => {
        console.log('enterLobby event received ', data);
        setPlayerId(data.newPlayer.playerId);
        setGames(data.currentGames);
        setPlayers(data.players);
    })

    socket.on('joinGameResponse', data => {
        console.log("joinGame response received")
        setCurrentGame(data.game)
        setGameOn(true)
    })

    return () => {
        socket.off('enterLobbyResponse');
        socket.off('joinGameResponse');
    }
}, [socket])

  return (
    <>
      <Header />

      {!gameOn && <div>
        <LogIn onEnterLobby = {enterLobby}/>
        <Lobby 
          onCreateGame={createGame} 
          players={players} 
          games={games} 
          onJoinGame={joinGame}
          playerId={playerId}
        />
      </div>}
    
      {gameOn && <div> 
        <ColumnButtons boardArr={board} onColumnSelect={onColumnSelect}/>
        <Board boardArr={board}/>
      </div>}
     
      {/* <DisplayPanel gameOver={gameOver} winner={winner} player={isP1?1:2}/> */}
    </>
  )
}

export default App
