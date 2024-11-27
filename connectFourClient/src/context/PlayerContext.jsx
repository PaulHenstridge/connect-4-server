import { createContext, useContext, useState } from "react";

// create a context object
const PlayerContext = createContext()

// create provider component
export const PlayerProvider = ({children}) => {
    const [player, setPlayer] = useState(null)
    const [friends, setFriends] = useState([])

    return (
        <PlayerContext.Provider value={{player, setPlayer, friends, setFriends}}>
            {children}
        </PlayerContext.Provider>
    )
}

// export the hook
export const usePlayerContext = () => useContext(PlayerContext)