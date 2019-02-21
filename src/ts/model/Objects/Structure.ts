import Entity from '../abstract/Entity';

export interface IStructureStats {
    health: number;
    endurance: number;
    isOpen: boolean;
    isLocked: boolean;
    uniqueKey: string;
}

export default class Structure extends Entity {
    stats: IStructureStats = {
        health: -1,
        endurance: 0,
        isOpen: false,
        isLocked: false,
        uniqueKey: '',
    }
}

