import { styled } from "styled-components";

const StyledHeader = styled.header`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: 20vh;
    min-height: 90px; 
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color:#44444444;
`

const StyledH1 = styled.h1`
    color: yellow;
    font-size:3em;
`

const LowerHeader = styled.div`
    display:flex;
    justify-content: space-around;
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
    return ( <StyledHeader>
    <StyledH1>Four-in-a-row</StyledH1>
   { player && !gameOn &&<LowerHeader>
        <h4> Hello <NameSpan>{player.playerName}</NameSpan>, welcome to the connect-4 lobby.</h4>
        <StyledButton onClick={() => onCreateGame(player.playerId)}>Create New Game</StyledButton>
    </LowerHeader>}

    </StyledHeader> );
}
 
export default Header;