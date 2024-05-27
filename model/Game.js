class Game{
    constructor(players, board){
        this.players = players;
        this.board = board;
        this.gameId = randomBytes(16).toString('hex');
        this.activePlayer = null;
        this.winner = null;
    }

    plahyTurn() {
        
    }
    
}