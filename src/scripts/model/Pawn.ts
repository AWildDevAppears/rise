import { GameObjects, Scene } from 'phaser';

import Actor from './Actor';

/**
 * Pawn
 * A pawn is any entity that can be controlled by the player or by AI
 */
export default class Pawn extends Actor {
    public static buildFromConfig(config: IPawnConfig, scene: Scene): Pawn {
        const p = new Pawn();
        p.posX = config.posX;
        p.posY = config.posY;
        p.name = config.name;

        p.sprite = new GameObjects.Sprite(
            scene,
            p.posX,
            p.posY,
            config.spritesheet,
        );

        return p;
    }


    public posX: number = 0;
    public posY: number = 0;

    public name: string = '';

    public isDesctuctible = true;

    public healthMax: number = PAWN_CONSTANTS.baseHealth;
    public healthNow: number = PAWN_CONSTANTS.baseHealth;

    public sprite?: GameObjects.Sprite;

    public moveLeft(isRunning: boolean = false) {
        this.posX -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this.redraw();
    }

    public moveRight(isRunning: boolean = false) {
        this.posX += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this.redraw();
    }

    public moveUp(isRunning: boolean = false) {
        this.posY += isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this.redraw();
    }

    public moveDown(isRunning: boolean = false) {
        this.posY -= isRunning ? PAWN_CONSTANTS.runSpeed : PAWN_CONSTANTS.moveSpeed;
        this.redraw();
    }

    private redraw() {
        if (this.sprite) {
            this.sprite.x = this.posX;
            this.sprite.y = this.posY;
        }
    }
}

export const PAWN_CONSTANTS = {
    baseHealth: 100,
    moveSpeed: 3,
    runSpeed: 5,
};

export interface IPawnConfig {
    name: string,
    posX: number,
    posY: number,
    spritesheet: string,
    stats: IPawnStatistics,
}

export interface IPawnStatistics {
    health?: number,
    // TODO: Add more statistics
}
