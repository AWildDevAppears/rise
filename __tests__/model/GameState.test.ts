import ChessboardGameState from '../../src/ts/model/GameState/ChessboardGameState';
import Item from '../../src/ts/model/abstract/Item';

const fork = new Item('id-fork');
const spoon = new Item('id-spoon');

fork.noun = 'fork';
spoon.noun = 'spoon';

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
                        ],
                    },
                ],
                items: [],
            },
            north: {
                south: 'middle',
                scenes: [],
                items: [],
            },
            south: {
                north: 'middle',
                scenes: [],
                items: [],
            },
            east: {
                west: 'middle',
                scenes: [
                    {
                        id: 'fork-and-spoon',
                        title: 'Fork and spoon',
                        body: [{}],
                        when: [
                            {
                                item: {
                                    id: 'id-fork',
                                    exists: true,
                                },
                            },
                            {
                                item: {
                                    id: 'id-spoon',
                                    exists: true,
                                },
                            },
                        ],
                    },
                    {
                        id: 'just-fork',
                        title: 'Just fork',
                        body: [{}],
                        when: [
                            {
                                item: {
                                    id: 'id-fork',
                                    exists: true,
                                },
                            },
                            {
                                item: {
                                    id: 'id-spoon',
                                    exists: false,
                                },
                            },
                        ],
                    },
                    {
                        id: 'nothing',
                        title: 'Nothing',
                        body: [{}],
                        when: [
                            {
                                item: {
                                    id: 'id-fork',
                                    exists: false,
                                },
                            },
                            {
                                item: {
                                    id: 'id-spoon',
                                    exists: false,
                                },
                            },
                        ],
                    },
                ],
                items: [spoon, fork],
            },
            west: {
                east: 'middle',
                scenes: [
                    {
                        id: 'has-fork',
                        title: 'I have a fork',
                        body: [{}],
                        when: [
                            {
                                item: {
                                    id: 'id-fork',
                                    exists: true,
                                },
                            },
                        ],
                    },
                    {
                        id: 'no-fork',
                        title: 'I have no fork',
                        body: [{}],
                        when: [
                            {
                                item: {
                                    id: 'id-fork',
                                    exists: false,
                                },
                            },
                        ],
                    },
                ],
                items: [spoon, fork],
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

        expect(game.player.location).toBe('west');
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

    it('should allow items in a location', () => {
        game.player.location = 'west';

        const items = game.listAllItems();
        const expectedItems = ['id-spoon', 'id-fork'];

        items.forEach((item: Item) => {
            expect(expectedItems.indexOf(item.id)).not.toBe(-1);
        });
    });

    it('should load the correct scene depending which flags are set', () => {
        game.player.location = 'west';
        game.loadScene();

        // I should get a scene that says I have the fork
        expect(game.scene.id).toBe('has-fork');

        let fork = game.map.locations[game.player.location].items.pop();
        game.loadScene();

        // I've just removed the fork so load the other scene
        expect(game.scene.id).toBe('no-fork');

        // Put the fork back where we left it
        game.map.locations[game.player.location].items.push(fork);
    });

    it('should allow the player to pick up an item from the location', () => {
        game.player.location = 'west';

        game.sendAction('pick up fork');

        expect(game.scene.id).toBe('no-fork');
        expect(game.player.inventory.count()).toBe(1);
    });

    it('should allow the player to move with a command', () => {
        game.player.location = 'middle';

        game.sendAction('move west');

        expect(game.player.location).toBe('west');
    });

    it('it should only load a scene only if all of the requirements match', () => {
        game.player.location = 'east';
        game.loadScene();
        expect(game.scene.id).toBe('fork-and-spoon');

        game.sendAction('take spoon');
        expect(game.scene.id).toBe('just-fork');
        game.sendAction('take fork');
        expect(game.scene.id).toBe('nothing');
    });
});
