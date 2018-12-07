import { AUTO, Game, Scene } from 'phaser';

import Pawn from '../model/Pawn';

import Actor from '../model/Actor';
import OutsideScene from '../scene/OutsideScene';

export default new class {
    public currentLocation: string = '';
    public inCurrentLocation: Actor[] = [];

    public player: Actor = new Actor();
    public game: Game = new Game();

    private currentScene?: Scene;

    public init() {
        this.game = new Game({
            height: 600,
            parent: 'game',
            type: AUTO,
            width: 800,
        });

        this.currentScene = this.game.scene.add(OutsideScene.key, OutsideScene, true);

        this.startNewGame();
    }

    public startNewGame() {
        if (!this.currentScene) { return; }

        this.player = Pawn.buildFromConfig({
            name: 'Player',
            posX: 0,
            posY: 0,
            spritesheet: 'player',
            stats: {},
        }, this.currentScene);
    }
}();
