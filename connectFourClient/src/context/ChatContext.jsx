import { createContext, useContext, useState } from "react";

// create a context object
const ChatContext = createContext()

// create provider component
export const ChatProvider = ({children}) => {
    const [chatMessages, setChatMessages] = useState([]);


    return (
        <ChatContext.Provider value={{chatMessages, setChatMessages}}>
            {children}
        </ChatContext.Provider>
    )
}

// export the hook
export const useChatContext = () => useContext(ChatContext)