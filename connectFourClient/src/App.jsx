import { useState, useEffect } from 'react'
import './App.css'

import Board from './components/Board'
import DisplayPanel from './components/DisplayPanel'
import Header from './components/Header'

import LogIn from './components/LogIn'
import Lobby from './components/Lobby'
import PlayAgain from './components/PlayAgain'
import ChatWindow from './components/ChatWindow'

import styled from 'styled-components'
import { usePlayerContext } from './context/PlayerContext.jsx'
import { useGameContext } from './context/GameContext.jsx'
import { useLobbyContext } from './context/LobbyContext.jsx'
import { useChatContext } from './context/ChatContext.jsx'

// socket emitters and listeners
import {signUp, logIn, createGame, joinGame, columnSelect, declareWinner, addFriend, unFriend, sendMessage, rematch, endGame, invite, acceptInvite, declineInvite} from './utils/socketEmitters.js'
import { initializeListeners } from './utils/socketListeners'

const GameOn = styled.div`
  display:flex;
  align-items:center;
  margin-top: ${(props) => (window.innerHeight * 0.2 > 90 ? '20vh' : '90px')};/* Matches header height - 10vh*/

`

function App() {

  // state from useContext
  const {
    player, setPlayer,
     friends, setFriends
    } = usePlayerContext()

  const {
    currentGame, setCurrentGame,
    gameOn, setGameOn, 
    gameOver, setGameOver, 
    winner, setWinner,
    board, setBoard
        } = useGameContext()

  const {
    players, setPlayers,
    games, setGames,
    invitations, setInvitations} = useLobbyContext()

    const {chatMessages, setChatMessages} = useChatContext();


  //socket listening
  useEffect(() => {
    const cleanup = initializeListeners({
      onEnterLobby:data => {
        console.log('enterLobby event received ', data)
        setGames(data.currentGames)
        setPlayers(data.players)
        setFriends(data.newPlayer.friends)
      },
      onReturnToLobby: data => {
        console.log("ReturnLobby rrsponse -->", data)
        setGames(data.currentGames)
        setPlayers(data.players)
        if(data.returningPlayer)
        console.log('FRIENDS STATE SET TO ->', friends)
      },
      onPlayerObject:data => {
        console.log('newPlayerObject event received ', data)
        setPlayer(data.player)
        setFriends(data.friends)

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
        console.log("playTurn response received", data)
        setCurrentGame(data.game);
        setBoard(data.game.board);
        setGameOver(data.isGameOver);
        setPlayers(data.newActivePlayers);
        if(data.isGameOver){
          console.log('gameOver playturn response', data)
        }
      },
      onRematch:data => {
        console.log("rematch response received", data)
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
      },
      onInvitation: invitingPlayer => {
        console.log('invitation received from ', invitingPlayer.playerName)
        setInvitations([...invitations, invitingPlayer])
        // TODO 
        //       - update invitations state on accept/decline
      },
      onAcceptInvite:data => {
        console.log("acceptInvite response received", data)
        if(data.success){
          setCurrentGame(data.game);
          setBoard(data.game.board);
          setGameOn(true);
          setGameOver(false);
          setGames(data.currentGames);
        }
      }, 
    })
    return () => cleanup()
},[])


  return (
    <>
      <Header player={player} onCreateGame={createGame} gameOn={gameOn}/>

      {!gameOn && !player && 
           <LogIn onSignUp = {signUp} onLogIn={logIn}/>
        }

        {player && !gameOn && <Lobby 
          players={players} 
          games={games} 
          onJoinGame={joinGame}
          player={player}
          friends={friends}
          onAddFriend={addFriend}
          onUnfriend={unFriend}
          onInvite={invite}
          onAccept={acceptInvite}
          onDecline={declineInvite}
        />}

      {gameOn && <GameOn> 
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
