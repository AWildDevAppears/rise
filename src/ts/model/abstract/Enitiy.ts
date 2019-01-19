import Modifier from "../Modifier";

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
}

export default class Entity {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    stats = {
        health: -1,
        endurance: -1,
    };

    constructor(public id: string = '') {}

    takeDamage(damage: number = 0, modifiers: Modifier[] = []) {
        if (this.stats.health === -1) return;

        if (this.stats.endurance === -1) {
            this.stats.health -= damage;
        }

        this.stats.health -= (damage / this.stats.endurance)
    }
}
