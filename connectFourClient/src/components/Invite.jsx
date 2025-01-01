import styled from 'styled-components'
import { usePlayerContext } from '../context/PlayerContext.jsx'

const InviteBtn = styled.button`
    margin:0.2em;
    font-size:0.8em;
`


const Invite = ({inviterName, inviterId, onAccept, onDecline}) => {

    const {player} = usePlayerContext()


    return ( <div>
        <span>{inviterName} has invited you to play</span>
        <div>
            <InviteBtn onClick={()=>onAccept(inviterId, player.playerId)}>Accept</InviteBtn>
            <InviteBtn onClick={()=>onDecline(inviterId, player.playerId)}>Decline</InviteBtn>
        </div>
    </div> );
}
 
export default Invite;