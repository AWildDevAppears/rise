import Humanoid from '../../src/ts/model/Characters/Humanoid';
import Modifier from '../../src/ts/model/Modifier';

describe('Modifier tests', () => {
    it('Should apply modifers to characters', () => {
        const character = new Humanoid();
        const mod = new Modifier('charisma-boost');

        character.stats.charisma = 7;

        mod.charisma = 3;

        character.addModifier(mod);

        expect(character.effectsApplied.length).toBe(1);
        expect(character.calculatedStats.charisma).toBe(10);
    });
    it('Should apply modifiers from potions to a character', () => {});
    it('Should apply modifiers from weapons to a character', () => {});
    it('Should allow modifiers to override other modifiers', () => {
        // If I am on fire, and then I get the wet modifier, I should lose the burning modifier
    });
    it('Should allow me to get several modifiers', () => {});
    it('Should take modifiers into account when calculating stats', () => {});
    it('Should not allow a character to have two modifiers of of the same type', () => {
        // I can't be on fire twice at the same time.
    });
    it('Should remove a modifier from a piece of armor from a character when they unequip it', () => {});
    it('should increase the damage of electrocution when a character is wet', () => {
        // buff modifiers based on other modifiers on the target
    });
    it('should take into account a characters resistances when applying modifiers', () => {
        // A mob that is physically fire cannot be set on fire
    });
    it('should increase the strength of modifiers that play to a characters weakness', () => {
        // You may be fire proof because you are literally fire, but I bet you don't like water.
    });
});

describe('Obscure modifiers', () => {
    it('should allow a door to have a "locked" modifier', () => {});
    it('should not let me open a locked door', () => {});
    it('should let me close a locked door', () => {});

    it('should let a key have the unlock modifier', () => {});
    it('should let a door be unlocked with a key', () => {});
    it('should ensure a key and lock match', () => {
        // I shouldn't be able to use any key on any door
    });

    it('should allow some modifiers to destroy themselves after use', () => {});

    it('should allow an item to have a learning modifier', () => {});
    it('should let a character learn a recipe from a recipe book', () => {});
});

describe('Contact modifiers', () => {
    it('should let a glass window infect a character with bleed when they break it with their fists', () => {});

    it('should not infect a character with contact modifiers if no contact is made', () => {
        // I shouldn't start bleeding if I shoot a window.
    });

    it('should let a character gain the "wet" effect when standing in a body of water', () => {});
    it('should let a body of water gain the modifier "electrified" when it is electrocuted', () => {});
    it('should let electrified water electrocute others that make contact with it', () => {});
});
