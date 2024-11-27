import { styled } from "styled-components";
import Countdown from "./Countdown";
import { useGameContext } from "../context/GameContext";

const Container = styled.div`
    background-color:#0307037d;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    position: absolute;
    top: 2em;
    left: 2em;
    right: 2em;
    bottom: 2em;
    box-sizing: border-box;
`

const ResultDisplay = styled.div`
    background-color: ${ props => props.pnum === 1 ? 'red' : 'blue'};
    border: 2px solid black;
    padding:2rem;
`

const DecisionPanel = styled.div`
    background-color:#b7b211;
    color:#1a1a1a;
    padding:2rem;
    border: 2px solid black;
    margin:1em;
`
// TODO - make timer component, pass in function to call on zero
//      - function to restart game if both players agree

const PlayAgain = ({game, onPlayAgain, playerId, gameId, onEndGame}) => {

    const {
        setBoard,
        setCurrentGame,
        setGameOn, 
        setGameOver
    } = useGameContext()

    // TODO - on gameOver a timer begins for both players to choose playAgain
    //  if both layers do not click game is ended
    // else a new game is started
    
    return ( <Container>
<ResultDisplay pnum={game.winner.playerNumber || 1}>
    <h2>{game.winner.playerName} is the winner!</h2>
    <p>{game.winner.wins} games won</p>
</ResultDisplay>

        <DecisionPanel>
            <Countdown onEndGame={onEndGame}/>
            <h3>Play again?</h3>
            <button onClick={() => onPlayAgain(playerId, gameId)}>Yes</button>
            <button onClick={() => onEndGame(setBoard, setCurrentGame, setGameOn, setGameOver)} >No</button>
        </DecisionPanel>
      
    
    </Container> );
}
 
export default PlayAgain;