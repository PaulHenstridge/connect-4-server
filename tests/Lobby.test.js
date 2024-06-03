import Lobby from '../model/Lobby.js';
import Player from '../model/Player.js';
import Game from '../model/Game.js';

describe('Lobby class', () => {
    let lobby;

    beforeEach(() => {
        lobby = new Lobby();
    });

    test('should create a lobby instance', () => {
        expect(lobby).toBeInstanceOf(Lobby);
    });

    test('should allow players to enter the lobby', () => {
        const player = lobby.enterLobby('Player1');
        expect(lobby.players.length).toBe(1);
        expect(lobby.players[0]).toBe(player);
    });

    test('should create a game', () => {
        const player = new Player('Player1');
        lobby.createGame(player);
        expect(lobby.games.length).toBe(1);
        expect(lobby.games[0].players).toContain(player);
    });

    test('should allow a player to join a game', () => {
        const player1 = new Player('Player1');
        lobby.createGame(player1);

        const player2 = new Player('Player2');
        const gameId = lobby.games[0].gameId;
        lobby.joinGame(player2, gameId);

        expect(lobby.games[0].players).toContain(player2);
        expect(player2.playerNumber).toBe(2);
    });

    test('should return open games', () => {
        const player = new Player('Player1');
        lobby.createGame(player);
        const openGames = lobby.viewOpenGames();
        expect(openGames.length).toBe(1);
    });

    test('should not allow a player to join a full game', () => {
        const player1 = new Player('Player1');
        const player2 = new Player('Player2');
        lobby.createGame(player1);
        lobby.joinGame(player2, lobby.games[0].gameId);

        const player3 = new Player('Player3');
        const result = lobby.joinGame(player3, lobby.games[0].gameId);
        expect(result).toBe('game full');
        expect(lobby.games[0].players.length).toBe(2);
    });
});
