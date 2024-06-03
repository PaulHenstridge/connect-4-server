import Game from '../model/Game.js';
import Player from '../model/Player.js';
import checkWin from '../utils/checkWin.js';

// Mock the checkWin function
jest.mock('../utils/checkWin.js');

describe('Game class', () => {
    let player1, player2, game;

    beforeEach(() => {
        player1 = new Player('Player1');
        player1.playerNumber = 1;

        player2 = new Player('Player2');
        player2.playerNumber = 2;

        game = new Game([player1, player2]);
    });

    test('should initialize game with two players', () => {
        expect(game.players.length).toBe(2);
        expect(game.players[0]).toBe(player1);
        expect(game.players[1]).toBe(player2);
    });

    test('should start with an empty board', () => {
        for (let row of game.board) {
            for (let cell of row) {
                expect(cell).toBe(0);
            }
        }
    });

    test('should allow player to add a counter to the board', () => {
        game.addCounter(player1, 0);
        expect(game.board[5][0]).toBe(player1.playerNumber);
    });

    test('should not allow adding a counter to a full column', () => {
        for (let i = 0; i < 6; i++) {
            game.addCounter(player1, 0);
        }
        expect(game.addCounter(player1, 0)[1]).toBe(null);
    });

    test('should toggle active player after a valid move', () => {
        game.playTurn(player1, 0);
        expect(game.activePlayer).toBe(player2);
        game.playTurn(player2, 1);
        expect(game.activePlayer).toBe(player1);
    });

    test('should detect a win and end the game', () => {
        checkWin.mockReturnValue(true); // Simulate a win
        game.playTurn(player1, 0);
        expect(game.winner).toBe(player1);
        expect(game.gameOver).toBe(true);
    });
});
