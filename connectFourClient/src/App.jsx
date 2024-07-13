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

  const [player, setPlayer] = useState({});
  const [gameOver, setGameOver] = useState(false);

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});

  const [waitingForOpponent, setWaitingforOpponent] = useState(false);
  const [gameOn, setGameOn] = useState(false);

const [winner, setWinner] = useState(null);

  // socket emitting
  const enterLobby = playerName => {
    socket.emit('enterLobby', playerName);
  };

  const createGame = playerId => {
    socket.emit('createGame', playerId);
  };

  const joinGame = (playerId, gameId) => {
    socket.emit('joinGame', {playerId, gameId});
  };

  const onColumnSelect = (columnIndex) => {
    if (gameOver) return;

    socket.emit('playTurn', {
      playerId: player.playerId,
      columnIndex: columnIndex,
      gameId: currentGame.gameId
    });
    
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
        setPlayer(data.newPlayer);
        setGames(data.currentGames);
        setPlayers(data.players);
    });

    socket.on('createGameResponse', data => {
        console.log("createGame response received");
        setCurrentGame(data.game);
        setGames(data.currentGames);
        setWaitingforOpponent(true);
    });

    socket.on('joinGameResponse', data => {
        console.log("joinGame response received");
        setCurrentGame(data.game);
        setGameOn(true);
        setGames(data.currentGames);
    });
    
    socket.on('playTurnResponse', data => {
        console.log("playTurn response received");
        setCurrentGame(data.game);
        setBoard(data.game.board);
        // TODO - duplication.  does board need its own state if its in currentGame?
    });

    return () => {
        socket.off('enterLobbyResponse');
        socket.off('createGameResponse');
        socket.off('joinGameResponse');
        socket.off('playTurnResponse');

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
          playerId={player.playerId}
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
