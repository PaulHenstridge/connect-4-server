import { styled} from "styled-components";

const Container = styled.section`
    border: 2px solid white;
`
const ActivePlayerDisplay = ({players}) => {
    return ( <Container>
    <h5>Current Active Players</h5>
    {players.map(player => <p key={player.playerId} >{player.playerName}</p>)}
    </Container> );
}
 
export default ActivePlayerDisplay;