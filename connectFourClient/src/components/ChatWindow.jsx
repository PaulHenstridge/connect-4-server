import React, { useState } from 'react';
import styled from 'styled-components'


const Container = styled.section`
    border: 2px solid blue;
    margin-top:1em;
    background-color:#647c9549;
    padding: 1em;
`

// more semantic html for message?
const Message = styled.div`
    color: ${props => props.senderid === props.playerid ? 'orange' : 'white'};
    padding-bottom:0.5em;
`

const Input = styled.input`
    padding:0.7em 1em;
`

const ChatWindow = ({onSendMessage, chatMessages, playerId}) => {

    const [messageText, setMessageText] = useState('')

    console.log("chat Messages into ChatWIndow",chatMessages)

    return ( <Container>
    <section>
    {chatMessages.map(message => {
        return <Message playerid={playerId} senderid={message.senderId}> {message.senderName} says {message.messageText}</Message>
        })
    }

    </section>
    <Input value={messageText} onChange={e => setMessageText(e.target.value)}/>
    <button onClick={() => onSendMessage(messageText)}>Send</button>
    </Container> );
}
 
export default ChatWindow;