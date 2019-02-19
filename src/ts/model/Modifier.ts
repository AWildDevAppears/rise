import { IStatistics } from './abstract/Entity';

export interface IModifierBuff {
    key: string;
    percentage: number;
}

export default class Modifier implements IStatistics {
    // number of ticks (seconds, turns, etc) the modifier will last
    ticks: number = -1;

    // If I can apply this effect multiple times to the same entity
    stacks: boolean = false;

    permenant: boolean = false;

    // All of these numbers can be negative or positive
    awareness = 0;
    charisma = 0;
    dexterity = 0;
    endurance = 0;
    intelligence = 0;
    luck = 0;
    strength = 0;
    health = 0;
    stamina = 0;
    moveSpeed = 0;

    // all of the status effects that will be removed when this one is applied
    negates: string[] = [];

    // All of the status effects that make this status effect stronger (excluding itself)
    buffs: IModifierBuff[];

    constructor(public id: string) {}
}
