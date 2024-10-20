import styled from 'styled-components'

const FriendsContainer = styled.div`
    /* display:flex;
    flex-direction: column; */
    /* padding: 4em; */
    border: 2px solid aliceblue;
    margin: 2em;
    width:30vw;
    & > h4{
        background-color:#1b0953;
        margin: 0;
        padding:0.5em 0 0.5em 0;
        align-self:flex-start;
    }
`

const Friend = styled.li`
    display:flex;
    flex-direction: column;
    border: 1px solid aliceblue;
    margin-bottom:1em;

`

const Button = styled.button`
    font-size:0.8em;
    box-shadow:#e2d19a 0 0 8px 2px;
    &:hover {
        box-shadow:none;
        background-color: #1d591a;
        border:black;
        font-size: 0%.9;
        padding: 0.65em 1.2em;
    }
`

const Friends = ({friends}) => {

    console.log('friends passed to Friend component:', friends)
    return ( <FriendsContainer>
        <h4>Friends</h4>
        <ul>
             { friends.map(friend => {
            return <Friend key={friend.playerId}><p>{friend.playerName}</p> <span>active:{friend.isActive && 'True!'} </span><Button>Challenge {friend.playerName} </Button> </Friend>
        })}
       </ul>
    </FriendsContainer> );
}
 
export default Friends;