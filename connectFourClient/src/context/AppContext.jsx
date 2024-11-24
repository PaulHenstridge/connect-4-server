import { createContext, useContext, useState } from "react";

// create a context object
const AppContext = createContext()

// create provider component
export const AppProvider = ({children}) => {
    const [player, setPlayer] = useState(null)
    const [currentGame, setCurrentGame] = useState({})

    return (
        <AppContext.Provider value={{player, setPlayer, currentGame, setCurrentGame}}>
            {children}
        </AppContext.Provider>
    )
}

// export the hook
export const useAppContext = () => useContext(AppContext)