import ActiveGameDisplay from "./ActiveGameDisplay";
import ActivePlayerDisplay from "./ActivePlayerDisplay";

const Lobby = ({onCreateGame, players, games, onJoinGame, playerId}) => {
    console.log('players passed to Lobby', players)
    return ( <>
    <h4>Welcome to the connect-4 lobby.</h4>
    <button onClick={() => onCreateGame(playerId)}>Create New Game</button>
    <ActivePlayerDisplay players={players}/>
    <ActiveGameDisplay games={games} onJoinGame={onJoinGame} playerId={playerId}/>
    </> );
}
 
export default Lobby;