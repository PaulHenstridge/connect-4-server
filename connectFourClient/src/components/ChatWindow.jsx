import React, { useState } from 'react';
import styled from 'styled-components'


const Container = styled.section`
    border: 2px solid blue;
    margin-top:1em;
    background-color:#647c9549;
    padding: 1em;
`

const ChatDialog = styled.div`
    display:flex;
    flex-direction: column;
    height:25vh;
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

`



const Input = styled.input`
    padding:0.7em 1em;
`

const ChatWindow = ({onSendMessage, chatMessages, playerId}) => {

    const [messageText, setMessageText] = useState('')

    console.log("chat Messages into ChatWIndow",chatMessages)

    return ( <Container>
    <ChatDialog>
    {chatMessages.map((message, i) => {
        return message.senderId === playerId ? (
         <UserMessage key={i}> You: {message.messageText}</UserMessage>
         ):(<OppMessage key={i}>{message.senderName}:{message.messageText}</OppMessage>)
    })}

    </ChatDialog>
    <Input value={messageText} onChange={e => setMessageText(e.target.value)}/>
    <button onClick={() => {
        onSendMessage(messageText)
        setMessageText('')
        }}>Send</button>
    </Container> );
}
 
export default ChatWindow;