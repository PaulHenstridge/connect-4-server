import Player from "../model/Player";

describe('Player class', () => {
    test('should create a player with a name and unique ID', () => {
        const player = new Player('Player1');
        expect(player.name).toBe('Player1');
        expect(player.playerId).toBeDefined();
        expect(player.wins).toBe(0);
    });

    test('should allow player to quit the game', () => {
        const player = new Player('Player1');
        console.log = jest.fn();
        player.quitGame();
        expect(console.log).toHaveBeenCalledWith('Player1 quit');
    });
});