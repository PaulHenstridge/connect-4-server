import { createContext, useContext, useState } from "react";

// create a context object
const LobbyContext = createContext()

// create provider component
export const LobbyProvider = ({children}) => {
    const [players, setPlayers] = useState([])
    const [games, setGames] = useState([])
    const [invitations, setInvitations] = useState([])

    return (
        <LobbyContext.Provider value={{players, setPlayers, games, setGames, invitations, setInvitations}}>
            {children}
        </LobbyContext.Provider>
    )
}

// export the hook
export const useLobbyContext = () => useContext(LobbyContext)