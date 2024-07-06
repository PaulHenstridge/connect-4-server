const ActivePlayerDisplay = ({players}) => {
    return ( <>
    <h5>Current Active Players</h5>
    {players.map(player => {
        <p>{player.playerName}</p>
    })}
    </> );
}
 
export default ActivePlayerDisplay;