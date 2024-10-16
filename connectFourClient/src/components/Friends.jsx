const Friends = ({friends}) => {

    console.log('friends passed to Friend component:', friends)
    return ( <>
        <h1>Friends</h1>
        { friends.map(friend => {
            return <p>{friend.playerName} is a fwend</p>
        })}
    </> );
}
 
export default Friends;