import { styled } from "styled-components";

const TurnWindow = styled.div`
    background-color: ${props => props.player === 1? 'red' : props.player === 2 ? 'blue' : 'transparent'};
    height:4em;
    margin-top:1em;
    display:flex;
    align-items: center;
    justify-content:center;
    border-radius:8%;
   
    `

const WinnerWindow = styled.div`
    background-color: ${props => props.winner  === 1? 'red' : props.winner === 2 ? 'blue' : 'transparent'};
`
const PlayAgainButton = styled.button`
    margin-bottom:0.6em;
    opacity:0.8;
    font-size:1.2rem;
    cursor: pointer; border:none;

    &:hover{
        opacity:0.85;
        box-shadow:0px 0px 6px 3px white;
    }
`
const DisplayPanel = ({gameOver, winner, player}) => {
    return ( 
        <>
        {gameOver && winner !== null && (
        <WinnerWindow winner={winner} >
          {winner === 1 && <h2>Red Wins!</h2>}
          {winner === 2 && <h2>Blue Wins!</h2>}
          <PlayAgainButton onClick={() => window.location.reload()}>Play again?</PlayAgainButton>
        </WinnerWindow>
      )}

      {!gameOver && (
        <TurnWindow player={player}>
         {player === 1 && <h2>Red Turn</h2>}
         {player === 2 && <h2>Blue Turn</h2>}
        </TurnWindow>
      )}
        </>
     );
}
 
export default DisplayPanel;