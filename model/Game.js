import {randomBytes} from crypto;

import checkWin from "../utils/checkWin";

export default class Game{
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
        this.gameOver = false;
    }

    addCounter(player, columnIndex){
        for(let rowIndex = this.board.length - 1; rowIndex>=0; rowIndex--){
            if (this.board[rowIndex][columnIndex] === 0){
                this.board[rowIndex][columnIndex] = player.playerNumber;
                return [this.board, rowIndex];
                break;
            }
            console.log("column is full")
            return [this.board, null];
        }
    }

    playTurn(player, columnIndex) {
        if (player!== this.activePlayer) return this.board;
        let rowIndex;
        [this.board, rowIndex] = this.addCounter(player, columnIndex);
        if (rowIndex === null) return this.board; // Column was full

        //  checkfor win
        if(checkWin(this.board, columnIndex, rowIndex, player)){
            console.log(`${player.name}, who was player ${player.playerNumber} has won!`)
            this.winner = player;
            this.gameOver = true;
        } else {
         // toggle active player
         this.activePlayer = this.players.find(p => p !== this.activePlayer);
       

        return this.board
    }
    
}