import { styled } from "styled-components";

const StyledH1 = styled.h1`
    color: yellow;
`
const StyledButton = styled.button`
    font-size:1.2rem;
    padding: 0.8em 1.6em;
    box-shadow:#e2d19a 0 0 8px 2px;
    &:hover {
        box-shadow:none;
        background-color: #1d591a;
        border:black;
        font-size: 1.4rem;
        padding: 0.65em 1.2em;
    }
`

const NameSpan = styled.span`
    font-size:1.4rem;
    color: red;
`
const Header = ({player, onCreateGame, gameOn}) => {
    return ( <>
    <StyledH1>Four-in-a-row</StyledH1>
   { player && !gameOn &&<>
        <h4> Hello <NameSpan>{player.playerName}</NameSpan>, welcome to the connect-4 lobby.</h4>
        <StyledButton onClick={() => onCreateGame(player.playerId)}>Create New Game</StyledButton>
    </>}

    </> );
}
 
export default Header;