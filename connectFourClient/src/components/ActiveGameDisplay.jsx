const ActiveGameDisplay = ({games, onJoinGame, playerId}) => {
    console.log('games to gameDisplay', games)
    return ( <>
    <h5>Current Active Games</h5>
    {games.map(game => (
        <div key={game.gameId}>
            {game.players.length === 2 && (
                <p> {game.players[0].playerName} v {game.players[1].playerName}</p>
            )}

            {game.players.length === 1 && (
                <div>
                    <p>Play against {game.players[0].playerName}?</p>
                    <button onClick={() => onJoinGame(playerId, game.gameId)}>Join Game</button> 
                </div>
            )}

        </div>
    ))}
    </> );
}
 
export default ActiveGameDisplay;