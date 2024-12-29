import { styled } from "styled-components";

import ActiveGameDisplay from "./ActiveGameDisplay";
import ActivePlayerDisplay from "./ActivePlayerDisplay";
import Friends from "./Friends";

const OuterContainer = styled.div`
    display:flex;
    margin-top: ${(props) => (window.innerHeight * 0.2 > 90 ? '20vh' : '90px')};/* Matches header height - 10vh*/

    
`

const LobbyContainer = styled.section`
    width:60vw;
`


const Lobby = ({onCreateGame, players, games, onJoinGame, player, onAddFriend, onUnfriend, onInvite}) => {
return ( 
    <OuterContainer>
        <LobbyContainer>
            <ActivePlayerDisplay players={players} onAddFriend={onAddFriend} myPlayerId={player.playerId}/>
            <ActiveGameDisplay games={games} onJoinGame={onJoinGame} myPlayerId={player.playerId}/>
        </LobbyContainer> 
        <Friends onUnfriend={onUnfriend} onInvite={onInvite}/>
    </OuterContainer>
    )
}
 
export default Lobby;