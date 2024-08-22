import { styled } from "styled-components";

import ActiveGameDisplay from "./ActiveGameDisplay";
import ActivePlayerDisplay from "./ActivePlayerDisplay";

const LobbyContainer = styled.section`
    width:80vw;
`
const StyledButton = styled.button`
    font-size:1.2rem;
    padding: 0.8em 1.6em;
    box-shadow:#e2d19a 0 0 8px 2px;
    &:hover {
        box-shadow:none;
        background-color: green;
        border:black;
        font-size: 1.4rem;
        padding: 0.65em 1.2em;
    }
`

const NameSpan = styled.span`
    font-size:1.4rem;
    color: red;
`

const Lobby = ({onCreateGame, players, games, onJoinGame, player}) => {
return ( <LobbyContainer>
    <h4> Hello <NameSpan>{player.playerName}</NameSpan>, welcome to the connect-4 lobby.</h4>
    <StyledButton onClick={() => onCreateGame(player.playerId)}>Create New Game</StyledButton>
    <ActivePlayerDisplay players={players}/>
    <ActiveGameDisplay games={games} onJoinGame={onJoinGame} playerId={player.playerId}/>
    </LobbyContainer> );
}
 
export default Lobby;