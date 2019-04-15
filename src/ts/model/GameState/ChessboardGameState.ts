import Humanoid from '../Characters/Humanoid';
import Character from '../Characters/Character';

export type Direction = 'north' | 'south' | 'east' | 'west';

export class ChessboardHumanoid extends Humanoid {
    location: string = '';

    ChessboardHumanoid(location: string) {
        this.location = location;
    }
}

export class ChessboardCharacter extends Character {
    location: string = '';

    ChessboardCharacter(location: string) {
        this.location = location;
    }
}

export interface ISceneBodySection {
    heading?: string;
    body?: string;
}

export interface IScene {
    id: string;
    title: string;
    body: ISceneBodySection[];
}

export interface ILocation {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
    scenes: IScene[];
}

export interface IMap {
    id: string;
    locations: { [key: string]: ILocation }
}

class ChessboardGameState {
    player: ChessboardHumanoid;
    scene: IScene;
    map: IMap;

    initialise(location: string) {
        this.player = new ChessboardHumanoid(location);
    };

    moveEntity(name: string, direction: Direction) {
        let id = '';

        if (name === 'player') {
            id = this.player.location;
        } else {
            // TODO: move anyone other than the player
        }

        const location = this.map.locations[id];

        if (!location || !location[direction]) {
            return;
        }

        switch(name) {
            case 'player':
                this.player.location = location[direction];
                break;
            default:
                // TODO: Look up the entity
        }
    }

    loadScene() {
        const location = this.player.location;

        this.scene = this.map.locations[location].scenes[0];
    }
}

export default new ChessboardGameState();
