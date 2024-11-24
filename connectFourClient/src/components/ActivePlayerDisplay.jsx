import { styled} from "styled-components";
import { useAppContext } from "../context/AppContext";

const Container = styled.section`
    border: 2px solid white;
    min-height:25vh;
    margin:2em 0;
    & > h4{
        background-color:#1b0953;
        margin: 0;
        padding:0.5em 0 0.5em 0;
    }
`

const PlayerBox = styled.div`
    background-color:#70909975;
    display:flex;
    justify-content: space-evenly;
    padding: 0.4rem;
    border: 1px solid black;
    margin: 0.4rem;
`
const ActivePlayerDisplay = ({players, onAddFriend, myPlayerId}) => {
    const { player} = useAppContext();    
    return ( <Container>
    <h4>Active Players</h4>
    {players.map(pl => <PlayerBox key={pl.playerId} > 
        <span>{pl.playerName}</span>
        <span>{pl.gamesPlayed} played</span>
        <span>{pl.wins} wins</span>
        {pl.playerId !== myPlayerId ?
         <button onClick={()=> onAddFriend(pl.playerId, player.playerId)}>Add Friend</button>
        :<button>View my Stats</button>}
       </PlayerBox>)}
    </Container> );
}
 
export default ActivePlayerDisplay;