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

const GameBox = styled.div`
    background-color: ${({status}) => status === "available" ? "green" : status==="waitiing" ? "blue" : status = "inPlay" ? "brown" : "grey"};
`

const ActiveGameDisplay = ({games, onJoinGame, playerId}) => {
    console.log('games to gameDisplay', games)


    return ( <Container>
    <h4> Active Games</h4>
    {games.map(game => (
        <div key={game.gameId}>
            {game.gameOver && (
                <GameBox status="complete"> {game.players[0].playerName} v {game.players[1].playerName} - winner:{game.winner.playerName}</GameBox>
                )}

            {!game.gameOver && game.players.length === 2 && (
                <GameBox status="inPlay"> {game.players[0].playerName} v {game.players[1].playerName} is in play</GameBox>
            )}

            {game.players.length === 1 && (
                <div>
                    {!game.gameOver && game.players[0].playerId !== playerId ?   
                        <GameBox status="available">Play against {game.players[0].playerName}?  <button onClick={() => onJoinGame(playerId, game.gameId)}>Join Game</button> </GameBox>
                        : <GameBox status="waiting">Waiting for opponent</GameBox>
                    }
                </div>
            )}

        </div>
    ))}
    </Container> )
}
 
export default ActiveGameDisplay;