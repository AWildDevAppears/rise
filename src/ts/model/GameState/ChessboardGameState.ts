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

export interface ILoggable {
    title?: string;
    message?: string;
    state: string;
    volatile: boolean;
    ref: string;
}

const ViableCommands = {
    // Movement commands
    go: 'go',
    walk: 'go',
    move: 'go',
    // Pick up commands
    take: 'take',
    pick: 'take',
    get: 'take',
    // Talk commands
    talk: 'talk',
    speak: 'talk',
    ask: 'talk',
    // Look commands
    look: 'look',
    inspect: 'look',
    // loot commands
    loot: 'loot',
    open: 'loot',
    // use command
    use: 'use',
    put: 'use',
};

class ChessboardGameState {
    player: ChessboardHumanoid;
    scene: IScene;
    map: IMap;

    lastResponse: string;
    log: ILoggable[] = [];

    currentLocation(): ILocation {
        return this.map.locations[this.player.location];
    }

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
        this.currentLocation().scenes.some(scene => {
            if (!scene.when) {
                this.scene = scene;
                return true;
            }

            // Weed out anything that doesn't match our requirements
            let canUseScene = true;

            scene.when.forEach(when => {
                if (
                    (this.currentLocation()
                        .items.map(item => item.id)
                        .indexOf(when.item.id) !==
                        -1) !==
                    when.item.exists
                ) {
                    canUseScene = false;
                }
            });

            if (canUseScene) {
                this.scene = scene;
                return true;
            }
        });
    }

    logAction(message: ILoggable) {
        if (message.state === 'success') {
            this.log.push(message);
            this.lastResponse = message.message;
        }
    }

    listAllItems(): Item[] {
        return this.currentLocation().items;
    }

    sendAction(action: string) {
        const actionArray = action.toLowerCase().split(' ');
        const leader = actionArray.splice(0, 1)[0];

        const normalisedLeader = ViableCommands[leader];

        if (!normalisedLeader) {
            return false;
        }

        switch (normalisedLeader) {
            case 'take':
                const items = this.currentLocation().items;

                let itemIndex = -1;
                let noun = '';
                if (
                    !actionArray.some(word => {
                        return items.some((item, idx) => {
                            if (item.noun === word) {
                                itemIndex = idx;
                                noun = item.noun;
                                return true;
                            }
                        });
                    })
                ) {
                    return;
                }

                this.logAction({
                    state: 'success',
                    volatile: false,
                    ref: `take:${this.player.location}:${noun}`,
                    message: `I took the ${noun}`,
                });
                this.player.inventory.addItem(this.currentLocation().items.splice(itemIndex, 1)[0]);
                break;
            case 'go':
                let direction = '';

                if (
                    !actionArray.some(word => {
                        if (word === 'north' || word === 'south' || word === 'east' || word === 'west') {
                            direction = word;
                            return true;
                        }
                    })
                ) {
                    return;
                }

                this.logAction({
                    state: 'success',
                    volatile: true,
                    ref: `go:${this.player.location}:${direction}`,
                    message: `I moved to the ${direction}`,
                });
                this.moveEntity('player', direction as Direction);
            case 'use':
                break;
            case 'talk':
                break;
            case 'loot':
                break;
            case 'look':
                break;
            default:
        }

        this.loadScene();
    }
}

export default new ChessboardGameState();
