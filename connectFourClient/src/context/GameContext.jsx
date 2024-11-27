import { createContext, useContext, useState } from "react";

// create a context object
const GameContext = createContext()

// create provider component
export const GameProvider = ({children}) => {
    const [currentGame, setCurrentGame] = useState({})
    const[gameOn, setGameOn] = useState(false)
    const[gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState(null)
    const [board, setBoard] = useState([
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ])

    return (
        <GameContext.Provider value={{ 
            currentGame, setCurrentGame,
            gameOn, setGameOn,
            gameOver, setGameOver,
            winner, setWinner,
            board, setBoard
            }}>
            {children}
        </GameContext.Provider>
    )
}

// export the hook
export const useGameContext = () => useContext(GameContext)