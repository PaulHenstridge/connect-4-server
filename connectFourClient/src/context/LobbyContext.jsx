import { createContext, useContext, useState } from "react";

// create a context object
const LobbyContext = createContext()

// create provider component
export const LobbyProvider = ({children}) => {
    const [players, setPlayers] = useState([])
    const [games, setGames] = useState([])

    return (
        <LobbyContext.Provider value={{players, setPlayers, games, setGames}}>
            {children}
        </LobbyContext.Provider>
    )
}

// export the hook
export const useLobbyContext = () => useContext(LobbyContext)