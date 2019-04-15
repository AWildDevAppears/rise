import Humanoid from '../Characters/Humanoid';
import Character from '../Characters/Character';
import Item from '../abstract/Item';

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

interface ISceneWhen {
    item?: {
        id: string;
        exists: boolean;
    };
}

export interface ISceneBodySection {
    heading?: string;
    body?: string;
}

export interface IScene {
    id: string;
    title: string;
    body: ISceneBodySection[];
    when?: ISceneWhen[];
}

export interface ILocation {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
    scenes: IScene[];
    items: Item[];
}

export interface IMap {
    id: string;
    locations: { [key: string]: ILocation };
}

const ViableCommands = {
    go: 'go',
    walk: 'go',
    move: 'go',
    take: 'take',
    pick: 'take',
};

class ChessboardGameState {
    player: ChessboardHumanoid;
    scene: IScene;
    map: IMap;

    initialise(location: string) {
        this.player = new ChessboardHumanoid(location);
    }

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

        switch (name) {
            case 'player':
                this.player.location = location[direction];
                break;
            default:
            // TODO: Look up the entity
        }
    }

    loadScene() {
        const location = this.map.locations[this.player.location];

        location.scenes.some(scene => {
            if (!scene.when) {
                this.scene = scene;
                return true;
            }

            for (let i = 0; i < scene.when.length; i++) {
                const when = scene.when[i];

                if (
                    when.item &&
                    (location.items.map(item => item.id).indexOf(when.item.id) !== -1) === when.item.exists
                ) {
                    this.scene = scene;
                    return true;
                }
            }
        });
    }

    listAllItems(): Item[] {
        const location = this.player.location;

        return this.map.locations[location].items;
    }

    sendAction(action: string) {
        const actionArray = action.split(' ');
        const leader = actionArray.splice(0, 1)[0];

        const normalisedLeader = ViableCommands[leader];

        if (!normalisedLeader) {
            return false;
        }

        switch (normalisedLeader) {
            case 'take':
                const items = this.map.locations[this.player.location].items;
                let itemIndex = -1;
                if (
                    !actionArray.some(word => {
                        return items.some(item => {
                            return item.noun === word;
                        });
                    })
                ) {
                    return;
                }

                this.player.inventory.addItem(this.map.locations[this.player.location].items.splice(itemIndex, 1)[0]);
                break;
            default:
        }

        this.loadScene();
    }
}

export default new ChessboardGameState();
