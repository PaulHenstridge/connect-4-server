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
const Ul = styled.ul`
    padding-inline-start:0;
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

const Friends = ({friends, onUnfriend}) => {

    console.log('friends passed to Friend component:', friends)
    return ( <FriendsContainer>
        <h4>Friends</h4>
        <Ul>
             { friends.map(friend => {
            return (<Friend key={friend.playerId}> 
                <span>{friend.playerName}</span> 
                <span>active:{friend.isActive && 'True!'} </span>
                <Button>Challenge {friend.playerName} </Button>
                <span onClick={() => onUnfriend(friend.playerId)}>Unfriend</span>
             </Friend>)
        })}
       </Ul>
    </FriendsContainer> );
}
 
export default Friends;