import React, { useState } from 'react';



const ChatWindow = ({onSendMessage, chatMessages}) => {

    const [messageText, setMessageText] = useState('')

    console.log("chat Messages into ChatWIndow",chatMessages)

    return ( <>
    <section>
    {chatMessages.map(message => {
        return <div> {message}</div>
        })
    }

    </section>
    <input value={messageText} onChange={e => setMessageText(e.target.value)}/>
    <button onClick={() => onSendMessage(messageText)}>Send</button>
    </> );
}
 
export default ChatWindow;