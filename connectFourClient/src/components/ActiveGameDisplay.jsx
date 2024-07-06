const ActiveGameDisplay = ({games, onJoinGame, playerId}) => {
    return ( <>
    <h5>Current Active Games</h5>
    {games.map(game => {
        game.players.length === 2 && <p> {game.players[0].playerName} v {game.players[1].playerName}</p>
        game.players.length === 1 && <div><p> Play against {game.players[0].playerName}?</p> <button onClick={() => onJoinGame(playerId, game.gameId)}></button> </div>
    })}
    </> );
}
 
export default ActiveGameDisplay;