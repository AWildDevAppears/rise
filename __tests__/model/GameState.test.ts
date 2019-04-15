import ChessboardGameState from '../../src/ts/model/GameState/ChessboardGameState';

describe('Game state - chessboard movement', () => {
    const game = ChessboardGameState;

    game.initialise('middle');
    game.map = {
        id: 'test-map',
        locations: {
            middle: {
                north: 'north',
                south: 'south',
                east: 'east',
                west: 'west',
                scenes: [
                    {
                        id: 'middle-scene',
                        title: 'Hello scene',
                        body: [
                            {
                                body: 'Welcome to the middle scene',
                            },
                        ]
                    }
                ]
            },
            north: {
                south: 'middle',
                scenes: [],
            },
            south: {
                north: 'middle',
                scenes: [],
            },
            east: {
                west: 'middle',
                scenes: [],
            },
            west: {
                east: 'middle',
                scenes: [],
            },
        },
    };

    it('should let me move north when I can go north', () => {
        game.player.location = 'middle';

        game.moveEntity('player', 'north');

        expect(game.player.location).toBe('north');
    });
    it('should let me move south when I can go south', () => {
        game.player.location = 'middle';

        game.moveEntity('player', 'south');

        expect(game.player.location).toBe('south');
    });
    it('should let me move east when I can go east', () => {
        game.player.location = 'middle';

        game.moveEntity('player', 'east');

        expect(game.player.location).toBe('east');
    });
    it('should let me move west when I can go west', () => {
        game.player.location = 'middle';

        game.moveEntity('player', 'west');

        expect(game.player.location).toBe('west')
    });

    it('should let me move north and then back', () => {
        game.player.location = 'middle';

        game.moveEntity('player', 'north');
        game.moveEntity('player', 'south');

        expect(game.player.location).toBe('middle');
    });

    it('should not let me go in a direction where there is nothing', () => {
        game.player.location = 'west';

        game.moveEntity('player', 'south');

        expect(game.player.location).toBe('west');
    });

    it('should load a scene for the location I am in', () => {
        game.player.location = 'middle';

        game.loadScene();

        expect(game.scene.id).toBe('middle-scene');
    });
});
