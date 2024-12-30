import React, { useState } from 'react';


import styled from 'styled-components'
import { usePlayerContext } from '../context/PlayerContext.jsx'
import {useLobbyContext} from '../context/LobbyContext.jsx'

import Invite from './Invite.jsx';

const FriendsContainer = styled.div`
    border: 2px solid aliceblue;
    margin: 2em;
    width:30vw;
    & > h4{
        background-color:#1b0953;
        margin: 0;
        padding:0.5em 0 0.5em 0;
    }
    display: flex;
    flex-direction: column;
    position: relative;
`
const Ul = styled.ul`
    padding-inline-start:0;
    position:relative;
`

const Friend = styled.li`
    display:flex;
    flex-direction: column;
    border: 1px solid aliceblue;
    margin:1em;
    background-color:#7036a66b;

    & > button {
        width: 50%;
        margin:0.4em auto;
    }

`

const Button = styled.button`
    font-size:0.8em;
    box-shadow:#e2d19a 0 0 8px 2px;
    &:hover {
        box-shadow:none;
        background-color: #1d591a;
        border:black;
        padding: 0.65em 1.2em;
    }
`
const InvitesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    `

const InvitesBar = styled.div`
    /* position:absolute;
    top:0; */
    width:100%;
    height:min-content;
    background-color: #ab2f43;
    padding:0.4em 0;
    margin:0.4rem 0;
    /* margin-top:40px; */
`



const Friends = ({ onInvite, onUnfriend, onAccept, onDecline}) => {


    const {player, friends} = usePlayerContext()
    const {invitations, setInvitations} = useLobbyContext()

    console.log('friends received into Friend component:', friends)

    return ( <FriendsContainer>
        <h4>Friends</h4>
        <InvitesWrapper>
        {invitations[0] && <InvitesBar>{invitations.map(inv => {
            return <Invite 
                key={inv.playerId}
                playerName={inv.playerName}
                playerId={inv.playerId}
                onAccept={onAccept}
                onDecline={onDecline} />
        })} </InvitesBar>}
            <Ul>
                { friends.map(friend => {
                return (<Friend key={friend.playerId}> 
                    <span>{friend.playerName}</span> 
                    <span>active:{friend.isActive && 'True!'} </span>
                    <Button onClick={() => onInvite(friend.playerId, player.playerId)}>Invite {friend.playerName} to play </Button>
                    <span onClick={() => onUnfriend(friend.playerId, player.playerId)}>Unfriend</span>
                </Friend>)
            })}
        </Ul>
       </InvitesWrapper>
    </FriendsContainer> );
}
 
export default Friends;