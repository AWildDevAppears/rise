import { Game } from 'phaser';

import Actor from '../model/Actor';

export default new class {
    public currentLocation: string = '';
    public inCurrentLocation: Actor[] = [];

    public player: Actor = new Actor();
    public game: Game = new Game();
}();
