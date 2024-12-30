import styled from 'styled-components'

const InviteBtn = styled.button`
    margin:0.2em;
    font-size:0.8em;
`

const Invite = ({playerName, playerId, onAccept, onDecline}) => {
    return ( <div>
        <span>{playerName} has invited you to play</span>
        <div>
            <InviteBtn onClick={()=>onAccept(playerId)}>Accept</InviteBtn>
            <InviteBtn onClick={()=>onDecline(playerId)}>Decline</InviteBtn>
        </div>
    </div> );
}
 
export default Invite;