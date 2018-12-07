import { Scene } from 'phaser';

export default class OutsideScene extends Scene {
    public static key = "OutsideScene";

    public preload() {
        this.load.spritesheet('player', './sprite/mc-sprite.svg', {
            frameWidth: 64,
        });
        return;
    }

    public create() {
        return;
    }

    public update() {
        return;
    }
}
