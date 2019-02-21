import Entity from '../abstract/Entity';

export interface IStructureStats {
    health: number;
    endurance: number;
    isActive: boolean;
    isLocked: boolean;
    uniqueKey: string;
    coverType: 'full' | 'half' | 'none';
    isTransparent: boolean;
}

export default class Structure extends Entity {
    stats: IStructureStats = {
        health: -1,
        endurance: 0,
        isActive: false,
        isLocked: false,
        uniqueKey: '',
        coverType: 'full',
        isTransparent: false,
    }
}

