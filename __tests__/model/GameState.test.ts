import ChessboardGameState from '../../src/ts/model/GameState/ChessboardGameState';

import Item from '../../src/ts/model/abstract/Item';
import Humanoid from '../../src/ts/model/Characters/Humanoid';

const fork = new Item('id-fork');
const spoon = new Item('id-spoon');
const key = new Item('id-key');

// Characters
const placey = new Humanoid();

placey.name = 'Placey';
placey.id = 'id-placey';
placey.description = `
        The creature has black oily skin and looks slippery to the touch. two lifeless pale eyes sit in it's sockets.
        It watches you with a puzzled expression.
    `;
placey.keywords = ['puzzled'];

fork.noun = 'fork';
spoon.noun = 'spoon';
spoon.description = 'A brushed metal spoon with an inticate pattern etched into the handle';

key.noun = 'key';

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
                characters: [],
            },
            north: {
                south: 'middle',
                scenes: [
                    {
                        id: 'placey-here',
                        title: 'Placey',
                        body: [{}],
                        when: [
                            {
                                character: {
                                    id: 'id-placey',
                                    exists: true,
                                },
                            },
                        ],
                    },
                    {
                        id: 'placey-gone',
                        title: 'North',
                        body: [],
                        when: [
                            {
                                character: {
                                    id: 'id-placey',
                                    exists: false,
                                },
                            },
                        ],
                    },
                ],
                items: [],
                characters: [placey],
            },
            south: {
                north: 'middle',
                scenes: [],
                items: [key],
                characters: [],
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
                characters: [],
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
                characters: [],
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

    it('should only load a scene only if all of the requirements match', () => {
        game.player.location = 'east';
        game.loadScene();
        expect(game.scene.id).toBe('fork-and-spoon');

        game.sendAction('take spoon');
        expect(game.scene.id).toBe('just-fork');
        game.sendAction('take fork');
        expect(game.scene.id).toBe('nothing');
    });

    it('should keep track of the last response the app returned from a command', () => {
        game.player.location = 'west';

        game.sendAction('take spoon');

        expect(game.lastResponse).toBe('I took the spoon');
    });

    it('should keep a log of all of the successfull actions in a scene', () => {
        game.player.location = 'middle';
        game.log = [];

        game.sendAction('move east');
        game.sendAction('move west');

        expect(game.log[0].message).toBe('I moved to the east');
        expect(game.log[1].message).toBe('I moved to the west');
    });

    it('should be able to log errors', () => {
        game.player.location = 'middle';
        game.log = [];

        game.sendAction('consume copious amounts of coffee');
        expect(game.lastResponse).toBe("I don't know how to do that");

        game.sendAction('go north');

        game.sendAction('take the bus home');
        expect(game.lastResponse).toBe("I don't know how to do that");
    });

    it('should allow a person to exist in a location', () => {
        game.player.location = 'north';
        game.log = [];
        expect(game.currentLocation().characters[0].name).toBe(placey.name);
    });

    it('should acknowledge people in a location when loading a scene', () => {
        game.player.location = 'north';
        game.log = [];

        game.loadScene();
        expect(game.scene.id).toBe('placey-here');

        game.currentLocation().characters = [];

        game.loadScene();
        expect(game.scene.id).toBe('placey-gone');

        game.currentLocation().characters.push(placey);
    });

    it('should let me talk to a person in a scene', () => {
        game.player.location = 'north';
        game.log = [];

        game.sendAction('talk to Placey');
        expect(game.lastResponse).toBe('What should I ask them about?');
    });

    it("should error if I try to talk to someone that doesn't exist", () => {
        game.player.location = 'north';
        game.log = [];

        game.sendAction('talk to no-one');
        expect(game.lastResponse).toBe("I don't know who you are trying to talk to");
    });

    it('should allow the app to highlight keywords in scenes', () => {
        game.player.location = 'north';
        game.loadScene();

        expect(game.keywords.length).toBeGreaterThan(0);
    });

    xit('should allow characters to have keywords', () => {
        // e.g. A character is describes as having a worried expression. A player should be able to "ask character about worried"
        // to which they will unlock some dialog in which the character elaborates on why they are worried.
        expect(placey.keywords.length).toBeGreaterThan(0);

        game.player.location = 'north';
        game.loadScene();

        expect(game.keywords).toContain(placey.keywords[0]);
    });

    xit('should allow a user to look at a location', () => {
        game.player.location = 'middle';
        game.log = [];

        // game.sendAction('look');
        // TODO:
    });

    it('should allow a user to look at an object', () => {
        game.player.location = 'west';

        // Endure we still have the correct items in the scene.
        game.currentLocation().items = [spoon, fork];

        game.sendAction('look at spoon');

        expect(game.lastResponse).toBe(spoon.description);
    });

    it('should let me look at a person', () => {
        game.player.location = 'north';

        game.sendAction('look at Placey');

        expect(game.lastResponse).toBe(placey.description);
    });

    it("should error if I try to look at something that doesn't exist", () => {
        game.player.location = 'middle';

        game.sendAction('look at my life and reconsider my life choices');
        expect(game.lastResponse).toBe("I don't know how to do that");
    });

    it('should let a user drop an item', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('take key');

        game.sendAction('drop key');
        expect(game.currentLocation().items[0].id).toBe('id-key');
    });

    it("should not let me drop something I don't have", () => {
        game.sendAction('drop something');

        expect(game.lastResponse).toBe("I don't understand what you want me to drop");
    });

    xit('should let me use an item', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('take key');

        game.sendAction('use key');
    });

    xit('should remove the item if I use it successfully', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('use key with lockbox');
    });

    xit('should not remove the item if I use it unsuccessfully', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('use key with teapot');
        // expect(game.lastResponse).toBe("I don't know how to do that");
    });

    xit('should allow scenes to acknowledge the usage of an item', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('use key with lockbox');

        // expect(game.scene.id).toBe('lockbox-open');
    });

    xit('should allow the app to highlight keywords in scenes', () => {
        //
    });

    xit('should allow the app to highlight keywords in conversations', () => {
        //
    });

    xit('should check existing actions when running a new action to remove any that are unneeded', () => {
        // If I pick up a spoon, then put it back down again, it should be like I never took the spoon in the first place.
    });

    xit('should let me interact with a container', () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('open wardrobe');
    });

    xit("should not let me open a container that doesn't exist", () => {
        game.player.location = 'south';
        game.log = [];

        game.sendAction('open a can of whoopass');
        expect(game.lastResponse).toBe("I don't know how to do that");
    });

    xit('should allow a user to ask a character about something', () => {
        game.player.location = 'north';

        game.sendAction('talk to Placey about complexion');
    });

    xit('should error if a user tries to talk to a character about something they have nothing to say about', () => {
        game.player.location = 'north';

        game.sendAction('talk to Placey about squirrels and their plans of world domination');

        // expect(game.lastResponse).toBe('I don\'t think they want to talk about that');
    });
});
