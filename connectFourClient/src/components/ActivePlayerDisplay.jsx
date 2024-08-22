import { styled} from "styled-components";

const Container = styled.section`
    border: 2px solid white;
    min-height:25vh;
    margin:2em 0 2em 0;
    & > h4{
        background-color:#1b0953;
        margin: 0;
        padding:0.5em 0 0.5em 0;
    }
`
const ActivePlayerDisplay = ({players}) => {
    return ( <Container>
    <h4>Active Players</h4>
    {players.map(player => <p key={player.playerId} >{player.playerName}  {player.wins} wins</p>)}
    </Container> );
}
 
export default ActivePlayerDisplay;