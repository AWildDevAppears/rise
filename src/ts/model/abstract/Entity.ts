import Modifier from '../Modifier';
import Item from '../abstract/Item';

const ENDURANCE_MODIFIER = 0.2;

export interface IStatistics {
    awareness: number;
    charisma: number;
    dexterity: number;
    endurance: number;
    intelligence: number;
    luck: number;
    strength: number;
    health: number;
    stamina: number;
    moveSpeed: number;
}

// N.Y.I
export interface IObject {
    hasCollidedWith: (entity: Entity) => void;
    hasBeenAttackedBy: (entity: Entity) => void;
    hasBeenInteractedWithBy: (entity: Entity) => void;
}

export default class Entity {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    isSolid: boolean = false;

    stats = {
        health: -1,
        endurance: 0,
    };

    constructor(public id: string = '') {
        if (!this.id) return;
    }

    takeDamage(damage: number = 0, modifiers: Modifier[] = []) {
        if (this.stats.health === -1) return;

        if (this.stats.endurance <= 1) {
            this.stats.health -= damage;
            return;
        }

        const defence = this.stats.endurance * ENDURANCE_MODIFIER;

        this.stats.health -= Math.floor(damage - defence);
    }

    use() {}

    useWith(item: Item) {}
}
