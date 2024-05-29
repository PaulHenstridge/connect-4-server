class Game{
    constructor(players){
        this.players = players;
        this.board = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
          ];
        this.gameId = randomBytes(16).toString('hex');
        this.activePlayer = this.players[0];
        this.winner = null;
    }

    playTurn(player, newBoard) {
        if (player!== this.activePlayer) return this.board;

        this.board = newBoard;
        //  checkfor win

        // togglee active player

        return this.board
    }
    
}