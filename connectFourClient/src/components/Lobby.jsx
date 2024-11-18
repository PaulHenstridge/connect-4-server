import { styled } from "styled-components";

import ActiveGameDisplay from "./ActiveGameDisplay";
import ActivePlayerDisplay from "./ActivePlayerDisplay";
import Friends from "./Friends";

const OuterContainer = styled.div`
    display:flex;
    
`

const LobbyContainer = styled.section`
    width:60vw;
`


const Lobby = ({onCreateGame, players, games, onJoinGame, player, friends, onAddFriend, onUnfriend}) => {
return ( 
    <OuterContainer>
        <LobbyContainer>
            <ActivePlayerDisplay players={players} onAddFriend={onAddFriend} myPlayerId={player.playerId}/>
            <ActiveGameDisplay games={games} onJoinGame={onJoinGame} myPlayerId={player.playerId}/>
        </LobbyContainer> 
        <Friends friends={friends} onUnfriend={onUnfriend}/>
    </OuterContainer>
    )
}
 
export default Lobby;