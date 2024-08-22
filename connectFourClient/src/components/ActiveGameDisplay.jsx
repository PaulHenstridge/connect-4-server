import { styled} from "styled-components";

const Container = styled.section`
    border: 2px solid white;
    min-height:25vh;
    & > h4{
        background-color:#1b0953;
        margin: 0;
        padding:0.5em 0 0.5em 0;
    }
`

const ActiveGameDisplay = ({games, onJoinGame, playerId}) => {
    console.log('games to gameDisplay', games)
    return ( <Container>
    <h4> Active Games</h4>
    {games.map(game => (
        <div key={game.gameId}>
            {game.players.length === 2 && (
                <p> {game.players[0].playerName} v {game.players[1].playerName}</p>
            )}

            {game.players.length === 1 && (
                <div>
                    { game.players[0].playerId !== playerId ? (<>  
                        <p>Play against {game.players[0].playerName}?</p>
                        <button onClick={() => onJoinGame(playerId, game.gameId)}>Join Game</button> </>)
                        : <p>Waiting for opponent</p>
                    }
                </div>
            )}

        </div>
    ))}
    </Container> )
}
 
export default ActiveGameDisplay;