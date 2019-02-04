import { IStatistics } from "./abstract/Entity";

export default class Modifier implements IStatistics {
    // number of ticks (seconds, turns, etc) the modifier will last
    ticks: number = -1;

    permenant: boolean = false;

    // All of these numbers can be nagative or positive
    awareness = 0;
    charisma = 0;
    dexterity = 0;
    endurance = 0;
    intelligence = 0;
    luck = 0;
    strength = 0;
    health = 0;
    stamina = 0;

    constructor(public id: string) {}
}
