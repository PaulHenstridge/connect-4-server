import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'

import { useGameContext } from '../context/GameContext.jsx';
import { usePlayerContext } from '../context/PlayerContext.jsx';


const Container = styled.section`
    border: 2px solid aliceblue;
    margin-top:1em;
    background-color:#647c9549;
    padding: 1em;
    width:30%;
    height:419px;
    margin:2em;
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
`

const ChatDialog = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y:auto;
    padding: 0 2em;
`

// more semantic html for message?
const UserMessage = styled.div`
    color: #d4770e;
    padding-bottom:0.5em;
    align-self: flex-start;
    border: 2px solid #d4770e;
    border-radius: 0 25% 25% 25%;
    padding:0.3em 0.9em;
    margin-bottom:0.6em;
    max-width: 75%;
    background-color: #0f181f6d

`
const OppMessage = styled.div`
    color: #0a0e4a;
    padding-bottom:0.5em;
    align-self: flex-end;
    border: 2px solid #0a0e4a;
    border-radius:25% 0 25% 25%;
    padding:0.3em 0.9em;
    margin-bottom:0.6em;
    max-width: 75%;
    background-color: #7c848b6e

`



const Input = styled.input`
    padding:0.7em 1em;
`

const ChatWindow = ({onSendMessage, chatMessages, playerId}) => {

    const {player} = usePlayerContext()
     const {currentGame} = useGameContext()

    const [messageText, setMessageText] = useState('')

    const chatRef = useRef(null)

    useEffect( () => {
        if(chatRef.current){
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [chatMessages])



    return ( <Container>
    <ChatDialog ref={chatRef}>
    {chatMessages.map((message, i) => {
        return message.senderId === playerId ? (
         <UserMessage key={i}> You: {message.messageText}</UserMessage>
         ):(<OppMessage key={i}>{message.senderName}:{message.messageText}</OppMessage>)
    })}
    </ChatDialog>
    <div>
        <Input value={messageText} onChange={e => {
            e.preventDefault()
            setMessageText(e.target.value)}}/>
        <button onClick={() => {
            onSendMessage(messageText, player.playerName, player.playerId, currentGame.gameId)
            setMessageText('')
            }}>Send</button>
    </div>

    </Container> );
}
 
export default ChatWindow;