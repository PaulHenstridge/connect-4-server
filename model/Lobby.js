class Lobby {
    constructor(){
        this.players = [];
        this.games = [];
    }

    //  think about seperate join and crerate options, so player can
    // join an available game, or create one.  available games shown on f/e
    joinOrCreateGame(name){
        const player = new Player(name)
        for ( game of games){
            if (game.players.length <2){
                game.players.push(player)
            }
        }
    }
}