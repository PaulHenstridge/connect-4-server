import { useAppContext } from '../context/AppContext.jsx';
import { styled } from "styled-components";

const SlotBox = styled.div`
    border: 1px solid aliceblue;
    padding:0.6em;
    border-radius:50%;
    width:1em;
    aspect-ratio:1;
    background-color:${props => props.value===1 ? 'red' : props.value===2 ? 'blue' : '#333232'}
    
`

const Slot = ({value, column, onColumnSelect}) => {
    const { player,currentGame } = useAppContext();

    return ( <>
    <SlotBox value={value} onClick={()=> onColumnSelect(column, player.playerId, currentGame.gameId, currentGame.gameOver)}></SlotBox>
    </> );
}
 
export default Slot;