import { styled} from "styled-components";

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
    console.log('###players array to active playerdisplay', players)
    return ( <Container>
    <h4>Active Players</h4>
    {players.map(player => <PlayerBox key={player.playerId} > 
        <span>{player.playerName}</span>
        <span>{player.gamesPlayed} played</span>
        <span>{player.wins} wins</span>
        {player.playerId !== myPlayerId ?
         <button onClick={()=> onAddFriend(player.playerId)}>Add Friend</button>
        :<button>View my Stats</button>}
       </PlayerBox>)}
    </Container> );
}
 
export default ActivePlayerDisplay;